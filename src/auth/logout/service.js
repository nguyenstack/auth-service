const jwt = require("jsonwebtoken");
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

  const refreshTokenResult = await pool.query(
    `
        SELECT *
        FROM refresh_tokens
        WHERE token = $1
          AND user_id = $2
        `,
    [refreshToken, decodedToken.userId],
  );

  const storedRefreshToken = refreshTokenResult.rows[0];

  if (!storedRefreshToken) {
    throw new AppError("Token đã bị thu hồi hoặc không tồn tại", 401);
  }

  await pool.query(
    `
        DELETE FROM refresh_tokens
        WHERE token = $1
        `,
    [refreshToken],
  );

  return {
    message: "Đăng xuất thành công",
  };
}

module.exports = {
  logOut,
};
