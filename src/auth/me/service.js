const pool = require("../../config/db");
const AppError = require("../../errors/AppError");
// ----- ME -----
async function getMe(userId) {
  const userResult = await pool.query(
    `
    SELECT id,email,created_at
    FROM users
    WHERE id = $1
    `,
    [userId],
  );

  if (!userResult.rows[0]) {
    throw new AppError("Không tìm thấy người dùng", 404);
  }

  return userResult.rows[0];
}

module.exports = {
  getMe,
};
