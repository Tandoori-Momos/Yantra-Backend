const userModel = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { errorCodes, loginType } = require("../../utils/constants");
const { registerUserBodyValidation } = require("./validationSchema");
const bcrypt = require("bcrypt");
const { generateTokens } = require("./utils");

exports.registerUser = catchAsync(async (req, res, next) => {
  const { error } = registerUserBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  // checking username
  const user = await userModel.findOne({ username: req.body.username });
  if (user) {
    return next(
      new AppError("Username already exists", 412, errorCodes.USER_NAME_EXIXTS)
    );
  }

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  await new userModel({
    loginType: loginType.BASIC_LOGIN,
    username: req.body.username,
    password: hashPassword,
    email: req.body.email,
    hasFilledDetails: true,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    mobileNumber: req.body.mobileNumber,
    age: req.body.age,
    location: req.body.location,
    interests: req.body.interests,
    healthConditions: req.body.healthConditions,
    groups: [],
    friends: [],
  }).save();

  const savedUser = await userModel.findOne({ username: req.body.username });
  const { accessToken } = await generateTokens(savedUser);

  res.status(201).json({
    status: "success",
    message: "User registered successfully",
    accessToken
  });
});
