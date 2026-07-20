const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../../config/db");
const AppError = require("../../errors/AppError");
// ----- refreshToken -----
async function refresh(refreshToken) {
  let decoded;

  try {
    decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new AppError("Refresh token không hợp lệ", 401);
  }

  // hash verify token
  const hashedRefreshToken = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  // Lưu refreshTokens vào database
  const refreshResult = await pool.query(
    `
        SELECT *
        FROM refresh_tokens
        WHERE token_hash = $1
          AND user_id = $2
        `,
    [hashedRefreshToken, decoded.userId],
  );

  const storedRefreshToken = refreshResult.rows[0];

  if (!storedRefreshToken) {
    throw new AppError("Token đã bị thu hồi hoặc không tồn tại", 401);
  }

  const userResult = await pool.query("SELECT * FROM users WHERE id = $1", [
    decoded.userId,
  ]);

  const user = userResult.rows[0];

  if (!user) {
    throw new AppError("Người dùng không tồn tại", 404);
  }

  // Xoá refreshToken
  await pool.query(
    `
        DELETE FROM refresh_tokens
        WHERE token_hash = $1
        `,
    [hashedRefreshToken],
  );

  // Tạo access token mới
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

  // Tạo refresh token
  const newRefreshToken = jwt.sign(
    {
      userId: user.id,
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: "7d",
    },
  );

  // ----- hash verify token -----
  const token = crypto
    .createHash("sha256")
    .update(newRefreshToken)
    .digest("hex");

  // ----- INSERT refresh_tokens -----
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await pool.query(
    `
    INSERT INTO refresh_tokens(user_id, token_hash, expires_at)
    VALUES($1, $2, $3)
    `,
    [user.id, token, expiresAt],
  );

  return {
    accessToken,
    refreshToken: newRefreshToken,
  };
}

module.exports = {
  refresh,
};
