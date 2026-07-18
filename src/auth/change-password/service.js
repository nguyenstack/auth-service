const bcrypt = require("bcryptjs");
const pool = require("../../config/db");
const AppError = require("../../errors/AppError");

// ----- changePassword -----
async function changePassword(userId, currentPassword, newPassword) {
  const userResult = await pool.query(
    "SELECT password_hash FROM users WHERE id = $1",
    [userId]
  );

  const user = userResult.rows[0]

  if (!user) {
    throw new AppError("Không tìm thâý người dùng", 404);
  }

  const isCurrentPasswordValid = await bcrypt.compare(
    currentPassword,
    user.password_hash
  );

  if (!isCurrentPasswordValid) {
    throw new AppError("Mật khẩu hiện tại không chính xác", 401);
  }

  const newPasswordHash = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
    UPDATE users 
    SET password_hash = $1,
        updated_at = NOW()
    WHERE id = $2;
    `,
    
    [newPasswordHash, userId]
  );
  return {
    message: "Mật khẩu đã được cập nhật thành công",
  };
}

module.exports = {
    changePassword,
};