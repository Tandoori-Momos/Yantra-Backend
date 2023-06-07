const mongoose = require("mongoose");

const groupChatsSchema = new mongoose.Schema(
  {
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Groups",
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Messages",
      },
    ],
  },
  { collection: "groupChats" }
);

module.exports = mongoose.model("groupChats", groupChatsSchema);
