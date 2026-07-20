const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const pool = require("../../config/db");
const AppError = require("../../errors/AppError");
// ----- logOut -----
async function logOut(refreshToken) {
  let decodedToken;

  try {
    decodedToken = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  } catch (err) {
    throw new AppError("Refresh token không hợp lệ", 401);
  }

  // ----- hash verify token -----
  const tokenHash = crypto
    .createHash("sha256")
    .update(refreshToken)
    .digest("hex");

  const refreshTokenResult = await pool.query(
    `
        SELECT *
        FROM refresh_tokens
        WHERE token_hash = $1
          AND user_id = $2
        `,
    [tokenHash, decodedToken.userId],
  );

  const storedRefreshToken = refreshTokenResult.rows[0];

  if (!storedRefreshToken) {
    throw new AppError("Token đã bị thu hồi hoặc không tồn tại", 401);
  }

  await pool.query(
    `
        DELETE FROM refresh_tokens
        WHERE token_hash = $1
        `,
    [tokenHash],
  );

  return {
    message: "Đăng xuất thành công",
  };
}

module.exports = {
  logOut,
};
