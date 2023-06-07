const mongoose = require("mongoose");

const individualChatsSchema = new mongoose.Schema(
  {
    user1: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    user2: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
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
  { collection: "IndividualChats" }
);

module.exports = mongoose.model("IndividualChats", individualChatsSchema);
