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
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
      },
    ],
  },
  { collection: "IndividualChats" }
);

module.exports = mongoose.model("IndividualChats", individualChatsSchema);
