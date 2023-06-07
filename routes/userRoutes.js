const express = require("express");
const authController = require("../controllers/user/userController");
const authRouter = express.Router();

authRouter.route("/").post(authController.registerUser);
authRouter.route("/login").post(authController.loginUser);
authRouter.route("/").get(authController.getUserProfile);
authRouter.route("/").patch(authController.updateUserProfile);
// authRouter.route("/").delete(authController.deleteUser);//can see later

module.exports = authRouter;
