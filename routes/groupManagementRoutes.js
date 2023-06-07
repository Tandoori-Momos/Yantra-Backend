const express = require("express");
const groupManagementController = require("../controllers/groupManagement/groupManagementController");
const groupManagementRouter = express.Router();
const auth = require("../middleware/authMiddleware");

groupManagementRouter
  .route("/join")
  .post(auth, groupManagementController.joinGroup);
groupManagementRouter.route("/").get(auth, groupManagementController.getGroups);
groupManagementRouter
  .route("/")
  .post(auth, groupManagementController.createGroup);
// groupManagementRouter
//   .route("/:groupId")
//   .get(groupManagementController.getGroup);
// groupManagementRouter
//   .route("/:groupId")
//   .patch(groupManagementController.updateGroup);//on hold
// groupManagementRouter
//   .route("/:groupId")
//   .delete(groupManagementController.deleteGroup);//on hold

// groupManagementRouter
//   .route("/:groupId/leave")
//   .delete(groupManagementController.leaveGroup);

// groupManagementRouter
//   .route("/:groupId/members")
//   .get(groupManagementController.getGroupMembers);

// //not needed now
// // //only group admin can add/remove members
// // groupManagementRouter
// //   .route("/:groupId/members/:memberId")
// //   .post(groupManagementController.addGroupMember);
// // groupManagementRouter
// //   .route("/:groupId/members/:memberId")
// //   .delete(groupManagementController.removeGroupMember);

module.exports = groupManagementRouter;
