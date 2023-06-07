const mongoose = require("mongoose");

const groupChatsSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
    },
    messages: [
      {
        senderId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Users",
        },
        message: {
          type: String,
          required: true,
        },
        date: {
          type: Date,
          default: Date.now(),
        },
      },
    ],
  },
  { collection: "groupChats" }
);

module.exports = mongoose.model("groupChats", groupChatsSchema);
