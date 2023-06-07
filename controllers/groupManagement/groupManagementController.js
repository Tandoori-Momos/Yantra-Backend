const friendRequestsModel = require("../../models/friendRequestsModel");
const userGroupsModel = require("../../models/userGroupsModel");
const userModel = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { errorCodes } = require("../../utils/constants");
const {
  createGroupBodyValidation,
  joinGroupBodyValidation,
} = require("./validationSchema");

exports.getGroups = catchAsync(async (req, res, next) => {
  const groups = await userGroupsModel.find({}).populate("members");
  res.status(200).json({
    status: "success",
    data: {
      groups,
    },
  });
});

exports.createGroup = catchAsync(async (req, res, next) => {
  const { error } = createGroupBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const { groupName, members } = req.body;
  const groupExists = await userGroupsModel.findOne({ name: groupName });
  if (groupExists) {
    return next(
      new AppError(
        `Group with name ${groupName} already exists`,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const memberIds = [];
  memberIds.push(req.user._id);
  for (let i = 0; i < members.length; i++) {
    const member = await userModel.findOne({ username: members[i] });
    if (!member) {
      return next(
        new AppError(
          `User with username ${members[i]} does not exist`,
          400,
          errorCodes.INPUT_PARAMS_INVALID
        )
      );
    }
    // console.log(member);
    memberIds.push(member._id);
  }

  const group = await userGroupsModel.create({
    name: groupName,
    members: memberIds,
  });

  for (let i = 0; i < memberIds.length; i++) {
    await userModel.updateOne(
      { _id: memberIds[i] },
      { $push: { groups: group._id } }
    );
  }

  res.status(200).json({
    status: "success",
    message: "Group created successfully",
    groupId: group._id,
  });
});

exports.joinGroup = catchAsync(async (req, res, next) => {
  const { error } = joinGroupBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const group = await userGroupsModel.findOne({ name: req.body.groupName });
  if (!group) {
    return next(
      new AppError(
        `Group with id ${group._id} does not exist`,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const user = await userModel.findOne({ _id: req.user._id });
  if (user.groups.includes(group._id)) {
    return next(
      new AppError(
        `User is already a member of this group`,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  await userGroupsModel.updateOne(
    { _id: group._id },
    { $push: { members: req.user._id } }
  );

  await userModel.updateOne(
    { _id: req.user._id },
    { $push: { groups: group._id } }
  );

  res.status(200).json({
    status: "success",
    message: "User joined group successfully",
  });
});
