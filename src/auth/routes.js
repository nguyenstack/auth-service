const express = require("express");

// ----- middlewares -----
const authMiddleware = require("../middlewares/auth.middleware");
const { validateRegister } = require("../middlewares/validate");
const { validateLogin } = 
require("../middlewares/validate");

// ----- controllers -----
const registerController = require("./register/controller");
const loginController =
require("./login/controller");
const logoutController = require("./logout/controller");
const refreshController = require("./refresh-token/controller");
const meController = require("./me/controller");


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

module.exports = router;