const express = require("express");
const groupChatController = require("../controllers/groupChat/groupChatController");
const groupChatRouter = express.Router();
const auth = require("../middleware/authMiddleware");

groupChatRouter.route("/").get(auth, groupChatController.getGroupChats);
groupChatRouter.route("/").post(auth, groupChatController.sendGroupChatMessage);

//on hold
// groupChatRouter.route("/:chatId").delete(groupChatController.deleteGroupChatMessage);

module.exports = groupChatRouter;
