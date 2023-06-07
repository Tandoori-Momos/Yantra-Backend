const express = require("express");
const friendManagementController = require("../controllers/friendManagement/friendManagementController");
const friendManagementRouter = express.Router();

friendManagementRouter.route("/").post(friendManagementController.addFriend);
friendManagementRouter.route("/").get(friendManagementController.getFriends);
friendManagementRouter
  .route("/:friendId")
  .delete(friendManagementController.removeFriend);
  
module.exports = friendManagementRouter;
