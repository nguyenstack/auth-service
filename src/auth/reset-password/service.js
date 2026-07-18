const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const pool = require("../../config/db");
const AppError = require("../../errors/AppError");

// ----- resetPassword -----
async function resetPassword(resetToken, newPassword) {
  
  // ----- hash reset token -----
  const tokenHash = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex")
            
  const tokenResult = await pool.query(
  `
  SELECT user_id
  FROM password_reset_tokens
  WHERE token_hash = $1
  AND expires_at > NOW()
  `,
  [tokenHash]
);

  if (tokenResult.rows.length === 0) {
  throw new AppError("Token không hợp lệ hoặc đã hết hạn", 401);
}

  const userId = tokenResult.rows[0].user_id;


  const passwordHash = await bcrypt.hash(newPassword, 10);

  await pool.query(
    `
    UPDATE users 
    SET password_hash = $1,
        updated_at = NOW()
    WHERE id = $2;
    `,
    
    [passwordHash, userId]
  );

  
   await pool.query(
        `
        DELETE FROM password_reset_tokens
        WHERE token_hash = $1
        `,
        [tokenHash]
    );

  return {
    message: "Mật khẩu đã được cập nhật thành công",
  };
}

module.exports = {
  resetPassword,
};