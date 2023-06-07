const userModel = require("../../models/userModel");
const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const { errorCodes, loginType } = require("../../utils/constants");
const {
  registerUserBodyValidation,
  loginUserBodyValidation,
} = require("./validationSchema");
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
    accessToken,
  });
});

exports.loginUser = catchAsync(async (req, res, next) => {
  const { error } = loginUserBodyValidation(req.body);
  if (error) {
    return next(
      new AppError(
        error.details[0].message,
        400,
        errorCodes.INPUT_PARAMS_INVALID
      )
    );
  }

  const user = await userModel.findOne({ username: req.body.username });
  if (!user) {
    return next(
      new AppError(
        "Invalid username or password",
        401,
        errorCodes.INVALID_USERNAME_OR_PASSWORD
      )
    );
  }

  const verifiedPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!verifiedPassword) {
    return next(
      new AppError(
        "Invalid username or password",
        401,
        errorCodes.INVALID_USERNAME_OR_PASSWORD
      )
    );
  }

  const { accessToken } = await generateTokens(user);

  res.status(200).json({
    message: "Logged in sucessfully",
    accessToken,
  });
});

exports.getUserProfile = catchAsync(async (req, res, next) => {
  const user = await userModel.findById(req.user._id);
  if (!user) {
    return next(
      new AppError("User not found", 404, errorCodes.USER_NOT_FOUND)
    );
  }

  res.status(200).json({
    status: "success",
    message: "User profile fetched successfully",
    user,
  });
});
