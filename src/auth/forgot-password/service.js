const crypto = require("crypto");
const pool = require("../../config/db");
const AppError = require("../../errors/AppError");

// ----- forgotPassword -----
async function forgotPassword(email) {
  // ----- kiểm tra email tồn tại -----
  const userResult = await pool.query("SELECT id FROM users WHERE email = $1", [
    email,
  ]);

  if (userResult.rows.length === 0) {
    return;
  }

  const userId = userResult.rows[0].id;

  // ----- tạo reset token -----
  const resetToken = crypto.randomBytes(32).toString("hex");

  // ----- hash reset token -----
  const tokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // ----- lưu database -----
  await pool.query(
    `
    INSERT INTO password_reset_tokens (user_id, token_hash, expires_at)
    VALUES ($1, $2, NOW() + interval '15 minutes')
    `,
    [userId, tokenHash],
  );

  return resetToken;
}

module.exports = {
  forgotPassword,
};
