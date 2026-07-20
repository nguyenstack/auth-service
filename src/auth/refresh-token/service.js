const jwt = require("jsonwebtoken");
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

  const refreshResult = await pool.query(
    `
        SELECT *
        FROM refresh_tokens
        WHERE token = $1
          AND user_id = $2
        `,
    [refreshToken, decoded.userId],
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

  return {
    accessToken,
  };
}

module.exports = {
  refresh,
};
