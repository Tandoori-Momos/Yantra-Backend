const express = require("express");
const groupChatController = require("../controllers/groupChat/groupChatController");
const groupChatRouter = express.Router();

groupChatRouter.route("/").post(groupChatController.createGroupChat);
groupChatRouter.route("/").get(groupChatController.getGroupChats);
groupChatRouter.route("/:chatId").get(groupChatController.getGroupChat);
groupChatRouter.route("/:chatId").post(groupChatController.sendGroupChatMessage);

//onn hold
// groupChatRouter.route("/:chatId").delete(groupChatController.deleteGroupChatMessage);

module.exports = groupChatRouter;
