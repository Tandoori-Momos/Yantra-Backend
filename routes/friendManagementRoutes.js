const express = require("express");
const friendManagementController = require("../controllers/friendManagement/friendManagementController");
const auth = require("../middleware/authMiddleware");
const friendManagementRouter = express.Router();

friendManagementRouter
  .route("/")
  .post(auth, friendManagementController.sendFriendRequest);
friendManagementRouter
  .route("/accept")
  .post(auth, friendManagementController.acceptFriendRequest);
friendManagementRouter
  .route("/reject")
  .post(auth, friendManagementController.rejectFriendRequest);
friendManagementRouter
.route("/").get(auth,friendManagementController.getFriends);

//on hold
// friendManagementRouter.route("/cancel").post(auth,friendManagementController.cancelFriendRequest);
// friendManagementRouter.route("/").get(friendManagementController.getFriends);
// friendManagementRouter
//   .route("/:friendId")
//   .delete(friendManagementController.removeFriend);

module.exports = friendManagementRouter;
