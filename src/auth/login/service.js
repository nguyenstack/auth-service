const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const pool = require("../../config/db");
const AppError = require("../../errors/AppError");
// ----- LOGIN -----
async function login(email, password) {
  // ----- Kiểm tra email -----
  const userResult = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  const user = userResult.rows[0];

  if (!user) {
    throw new AppError("Email hoặc mật khẩu không hợp lệ", 401);
  }

  // ----- Kiểm tra mật khẩu -----
  const isPasswordMatch = await bcrypt.compare(password, user.password_hash);

  if (!isPasswordMatch) {
    throw new AppError("Email hoặc mật khẩu không hợp lệ", 401);
  }

  // ----- Tạo Access token -----
  const accessToken = jwt.sign(
    {
      userId: user.id,
      email: user.email,
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: "1h",
    },
  );

  // ----- Tạo Refresh Token -----
  const refreshToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );

  // ----- INSERT refresh_tokens -----
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await pool.query(
    `
    INSERT INTO refresh_tokens(user_id, token, expires_at)
    VALUES($1, $2, $3)
    `,
    [user.id, refreshToken, expiresAt],
  );

  return {
    accessToken,
    refreshToken,
  };
}

module.exports = {
  login,
};
