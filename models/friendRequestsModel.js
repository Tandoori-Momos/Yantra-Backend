const mongoose = require("mongoose");

const friendRequestSchema = mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    date: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "friendRequests" }
);

module.exports = mongoose.model("friendRequests", friendRequestSchema);
