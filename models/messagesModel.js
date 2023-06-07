const mongoose = require("mongoose");

const messagesSchema = new mongoose.Schema(
  {
    chatType: {
      type: Number, //0 for individual chat 1 for group chat
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    message: {
      type: String,
    },
    time: {
      type: Date,
      default: Date.now(),
    },
  },
  { collection: "Messages" }
);

module.exports = mongoose.model("Messages", messagesSchema);
