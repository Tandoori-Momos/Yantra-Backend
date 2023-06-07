const mongoose = require("mongoose");

const UserGroupsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
    ],
  },
  { collection: "Groups" }
);

module.exports = mongoose.model("Groups", UserGroupsSchema);
