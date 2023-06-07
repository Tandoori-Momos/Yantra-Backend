const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

const loginType = {
  GOOGLE_LOGIN: 0,
  BASIC_LOGIN: 1,
};

const errorCodes = {
  UNKNOWN_ERROR: 0,
  EXCEPTION: 1,
  INVALID_URL: 2,
  INPUT_PARAMS_INVALID: 3,
  INVALID_USERNAME_OR_PASSWORD: 4,
  USER_NOT_FOUND: 5
};

module.exports = {
  loginType,
  errorCodes,
};
