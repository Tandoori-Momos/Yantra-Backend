const express = require("express");
const userController = require("../controllers/user/userController");
const userRouter = express.Router();
const auth = require("../middleware/authMiddleware");


userRouter.route("/").post(userController.registerUser);
userRouter.route("/login").post(userController.loginUser);
userRouter.route("/").get(auth,userController.getUserProfile);
// authRouter.route("/").patch(authController.updateUserProfile);//can see later
// authRouter.route("/").delete(authController.deleteUser);//can see later

module.exports = userRouter;
