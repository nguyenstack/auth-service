const crypto = require("crypto");
const pool = require("../../config/db");
const AppError = require("../../errors/AppError");

// ----- verifyEmail -----
async function verifyEmail(verifyToken) {
  // ----- hash verify token -----
  const tokenHash = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

   const verifyResult = await pool.query(
  `
  SELECT user_id
  FROM email_verification_tokens
  WHERE token_hash = $1
  AND expires_at > NOW()
  `,
  [tokenHash]
);

  if (verifyResult.rows.length === 0) {
  throw new AppError("Token không hợp lệ hoặc đã hết hạn", 401);
}

  const userId = verifyResult.rows[0].user_id;

  await pool.query(
    `
    UPDATE users
    SET email_verified = TRUE,
        email_verified_at = NOW()
    WHERE id = $1;
    `,
    [userId]
  );

  await pool.query(
        `
        DELETE FROM email_verification_tokens
        WHERE token_hash = $1
        `,
        [tokenHash]
    );
    return {
    message: "Xác minh email thành công, vui lòng đăng nhập",
  };
}

module.exports = {
  verifyEmail,
};