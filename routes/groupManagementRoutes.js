const express = require("express");
const groupManagementController = require("../controllers/groupManagement/groupManagementController");
const groupManagementRouter = express.Router();

groupManagementRouter.route("/").get(groupManagementController.getGroups);
groupManagementRouter.route("/").post(groupManagementController.createGroup);
groupManagementRouter
  .route("/:groupId")
  .get(groupManagementController.getGroup);
groupManagementRouter
  .route("/:groupId")
  .patch(groupManagementController.updateGroup);
groupManagementRouter
  .route("/:groupId")
  .delete(groupManagementController.deleteGroup);

groupManagementRouter
  .route("/:groupId/join")
  .post(groupManagementController.joinGroup);
groupManagementRouter
  .route("/:groupId/leave")
  .delete(groupManagementController.leaveGroup);

groupManagementRouter
  .route("/:groupId/members")
  .get(groupManagementController.getGroupMembers);

//not needed now
// //only group admin can add/remove members
// groupManagementRouter
//   .route("/:groupId/members/:memberId")
//   .post(groupManagementController.addGroupMember);
// groupManagementRouter
//   .route("/:groupId/members/:memberId")
//   .delete(groupManagementController.removeGroupMember);

module.exports = groupManagementRouter;
