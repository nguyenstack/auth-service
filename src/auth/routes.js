const express = require("express");

// ----- middlewares -----
const authMiddleware = require("../middlewares/auth.middleware");
const { validateRegister } = require("../middlewares/validate");
const { validateLogin } = 
require("../middlewares/validate");
const { validateChangePassword } =
require("../middlewares/validate");

// ----- controllers -----
const registerController = require("./register/controller");
const loginController =
require("./login/controller");
const logoutController = require("./logout/controller");
const refreshController = require("./refresh-token/controller");
const meController = require("./me/controller");
const changePasswordController = require("./change-password/controller");
const forgotPasswordController = require("./forgot-password/controller");
const resetPasswordController = 
require("./reset-password/controller");
const verifyEmailController =
require("./verify-email/controller");

const router = express.Router();

// ----- Register -----
router.post(
  "/register",
  validateRegister,
  registerController.register
);

// ----- Login -----
router.post(
  "/login",
  validateLogin,
  loginController.login
);

// ----- Logout -----
router.post(
  "/log-out",
  logoutController.logOut
);

// ----- Refresh Token -----
router.post(
  "/refresh",
  refreshController.refresh
);

// ----- Me -----
router.get(
  "/me",
  authMiddleware,
  meController.me
);

// ----- ChangePassword -----
router.patch(
  "/change-password",
  authMiddleware,
  validateChangePassword,
  changePasswordController.changePassword
);

// ----- ForgotPassword -----
router.post(
  "/forgot-password",          forgotPasswordController.forgotPassword
);

// ----- ResetPassword -----
router.post(
  "/reset-password",
resetPasswordController.resetPassword
);

// ----- verifyEmail -----
router.get(
  "/verify-email", 
  verifyEmailController.verifyEmail
);

module.exports = router;