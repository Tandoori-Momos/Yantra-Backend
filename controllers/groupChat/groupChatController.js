const { get } = require("mongoose");
const friendRequestsModel = require("../../models/friendRequestsModel");
const userGroupsModel = require("../../models/userGroupsModel");
const userModel = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { errorCodes } = require("../../utils/constants");
const {
  getGroupChatsBodyValidation,
  sendMessageBodyValidation,
} = require("./validationSchema");
const groupChatModel = require("../../models/groupChatModel");

exports.getGroupChats = catchAsync(async (req, res, next) => {
  const { error } = getGroupChatsBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const { groupId } = req.body;
  const group = await userGroupsModel.findOne({ _id: groupId });
  if (!group) {
    return next(
      new AppError(
        `Group with id ${groupId} does not exist`,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const data = await groupChatModel
    .find({
      groupId: groupId,
    })
    .populate("messages.senderId", "username");

  res.status(200).json({
    status: "success",
    message: "Group chats fetched successfully",
    data,
  });
});

exports.sendGroupChatMessage = catchAsync(async (req, res, next) => {
  const { error } = sendMessageBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const { groupName, message } = req.body;
  const group = await userGroupsModel.findOne({ name: groupName });
  if (!group) {
    return next(
      new AppError(
        `Group with id ${group._id} does not exist`,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const groupChat = await groupChatModel.findOne({ groupId: group._id });
  if (!groupChat) {
    await new groupChatModel({
      groupId: group._id,
    }).save();
  }

  await groupChatModel.findOneAndUpdate(
    { groupId: group._id },
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
