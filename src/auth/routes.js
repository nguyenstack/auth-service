const express = require("express");

// ----- middlewares -----
const { validateRegister } = require("../middlewares/validate");

// ----- controllers -----
const registerController = require("./register/controller");

const router = express.Router();

// ----- Register -----
router.post(
  "/register",
  validateRegister,
  registerController.register
);

module.exports = router;