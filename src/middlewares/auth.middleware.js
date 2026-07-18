const jwt = require("jsonwebtoken");
const AppError = require("../errors/AppError");

function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError("Không có token", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_ACCESS_SECRET
    );

    req.user = decoded;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new AppError("Token đã hết hạn", 401);
    }

    if (error.name === "JsonWebTokenError") {
      throw new AppError("Token không hợp lệ", 401);
    }

    throw error;
  }
}

module.exports = authMiddleware;