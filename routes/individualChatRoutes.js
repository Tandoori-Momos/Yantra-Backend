const express = require("express");
const individualChatController = require("../controllers/individualChat/individualChatController");
const individualChatRouter = express.Router();

individualChatRouter
  .route("/:friendId")
  .post(individualChatController.createChat);
individualChatRouter.route("/").get(individualChatController.getChats);

individualChatRouter
  .route("/:chatId")
  .get(individualChatController.getInidividualChat);
individualChatRouter
  .route("/:chatId")
  .post(individualChatController.sendIndividualChatMessage);

//onn hold
// individualChatRouter
//   .route("/:chatId")
//   .delete(individualChatController.deleteChatMessage);

module.exports = individualChatRouter;
