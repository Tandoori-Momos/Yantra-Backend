const friendRequestsModel = require("../../models/friendRequestsModel");
const userModel = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { errorCodes } = require("../../utils/constants");
const { addFriendBodyValidation } = require("./validationSchema");

exports.sendFriendRequest = catchAsync(async (req, res, next) => {
  const { error } = addFriendBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const toAddUser = await userModel.findOne({
    username: req.body.username,
  });

  const user = await userModel.findOne({ _id: req.user._id });
  if (user.friends.includes(toAddUser._id)) {
    return next(
      new AppError(
        "User is already your friend",
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const toAddUserId = toAddUser._id;
  if (toAddUserId == req.user._id) {
    return next(
      new AppError(
        "You cannot add yourself as a friend",
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  await new friendRequestsModel({
    from: req.user._id,
    to: toAddUserId,
  }).save();

  res.status(200).json({
    status: "success",
    message: "Friend Request Sent successfully",
  });
});

exports.acceptFriendRequest = catchAsync(async (req, res, next) => {
  const { error } = addFriendBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const toAddUser = await userModel.findOne({
    username: req.body.username,
  });

  const pendingRequest = await friendRequestsModel.findOne({
    from: toAddUser._id,
    to: req.user._id,
  });

  if (!pendingRequest) {
    return next(
      new AppError(
        "No pending friend request from this user",
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  console.log(toAddUser, pendingRequest);

  await friendRequestsModel.findOneAndDelete({
    from: toAddUser._id,
    to: req.user._id,
  });

  await userModel.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { friends: toAddUser._id } }
  );

  await userModel.findOneAndUpdate(
    { _id: toAddUser._id },
    { $push: { friends: req.user._id } }
  );

  res.status(200).json({
    status: "success",
    message: "Friend Request Accepted successfully",
  });
});

exports.rejectFriendRequest = catchAsync(async (req, res, next) => {
  const { error } = addFriendBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const pendingRequest = await friendRequestsModel.findOne({
    from: req.body.username,
    to: req.user._id,
  });

  if (!pendingRequest) {
    return next(
      new AppError(
        "No pending friend request from this user",
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const toAddUser = await userModel.findOne({
    username: req.body.username,
  });

  await friendRequestsModel.findOneAndDelete({
    from: toAddUser._id,
    to: req.user._id,
  });

  res.status(200).json({
    status: "success",
    message: "Friend Request Rejected successfully",
  });
});
