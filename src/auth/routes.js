const express = require("express");

// ----- middlewares -----
const { validateRegister } = require("../middlewares/validate");
const { validateLogin } = 
require("../middlewares/validate");

// ----- controllers -----
const registerController = require("./register/controller");
const loginController =
require("./login/controller");
const logoutController = require("./logout/controller");

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

module.exports = router;