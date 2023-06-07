const { get } = require("mongoose");
const friendRequestsModel = require("../../models/friendRequestsModel");
const userGroupsModel = require("../../models/userGroupsModel");
const userModel = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { errorCodes } = require("../../utils/constants");
const { sendIndividualMessageBodyValidation } = require("./validationSchema");
const individualChatModel = require("../../models/individualChatModel");

exports.getChats = catchAsync(async (req, res, next) => {
  const chats = await individualChatModel
    .find({
      $or: [{ user1: req.user._id }, { user2: req.user._id }],
    })
    .populate("user1 user2", "username");

  res.status(200).json({
    status: "success",
    message: "Chats fetched successfully",
    data: chats,
  });
});

exports.sendIndividualChatMessage = catchAsync(async (req, res, next) => {
  const { error } = sendIndividualMessageBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const { friendName, message } = req.body;
  const friend = await userModel.findOne({ username: friendName });
  if (!friend) {
    return next(
      new AppError(
        `User with username ${friendName} does not exist`,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }
  const individualChat = await individualChatModel.findOne({
    $or: [
      { user1: req.user._id, user2: friend._id },
      { user1: friend._id, user2: req.user._id },
    ],
  });
  if (!individualChat) {
    await new individualChatModel({
      user1: req.user._id,
      user2: friend._id,
    }).save();
  }


  await individualChatModel.findOneAndUpdate(
    {
      $or: [
        { user1: req.user._id, user2: friend._id },
        { user1: friend._id, user2: req.user._id },
      ],
    },
    {
      $push: {
        messages: {
          senderId: req.user._id,
          message: message,
        },
      },
    }
  );

  res.status(200).json({
    status: "success",
    message: "Message sent successfully",
  });
});
