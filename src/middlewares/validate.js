const AppError = require("../errors/AppError");

function validateEmail(email) {
  if (!email) {
    throw new AppError("Email là bắt buộc", 400);
  }

  if (!email.includes("@")) {
    throw new AppError("Email không hợp lệ", 400);
  }
}

function validatePassword(password) {
  if (!password) {
    throw new AppError("Password là bắt buộc", 400);
  }

  if (password.length < 6) {
    throw new AppError("Password phải có ít nhất 6 ký tự", 400);
  }
}

function validateRegister(req, res, next) {
  const { email, password } = req.body;

  validateEmail(email);
  validatePassword(password);

  next();
}

function validateLogin(req, res, next) {
  const { email, password } = req.body;

  validateEmail(email);
  validatePassword(password);

  next();
}


module.exports = {
  validateRegister,
  validateLogin,
};