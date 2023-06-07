const express = require("express");
const individualChatController = require("../controllers/individualChat/individualChatController");
const individualChatRouter = express.Router();
const auth = require("../middleware/authMiddleware");

individualChatRouter.route("/").get(auth,individualChatController.getChats);
// individualChatRouter
//   .route("/")
//   .get(individualChatController.getInidividualChat);
individualChatRouter
  .route("/")
  .post(auth,individualChatController.sendIndividualChatMessage);

// //onn hold
// // individualChatRouter
// //   .route("/:chatId")
// //   .delete(individualChatController.deleteChatMessage);

module.exports = individualChatRouter;
