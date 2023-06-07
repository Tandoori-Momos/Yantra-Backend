const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    loginType: {
      type: Number, //0 for google login 1 for basic login
      required: true,
    },
    username: {
      type: String,
    },
    password: {
      type: String,
    },
    email: {
      type: String,
    },
    hasFilledDetails: {
      type: Boolean,
    },
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    mobileNumber: {
      type: String,
    },
    age: {
      type: Number,
    },
    location: {
      type: String,
    },
    interests: [
      {
        type: String,
      },
    ],
    healthConditions: [
      {
        type: String,
      },
    ],
    hobbies: [
      {
        type: String,
      },
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Groups",
      },
    ],
    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "Users" }
);

module.exports = mongoose.model("Users", userSchema);
