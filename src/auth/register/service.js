const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const pool = require("../../config/db");
const AppError = require("../../errors/AppError");

// ----- REGISTER -----
async function register(email, password) {
  
  // ----- kiểm tra email tồn tại -----
  const existingUser = await pool.query(
    "SELECT id FROM users WHERE email = $1",
    [email]
  );

  if (existingUser.rows.length > 0) {
    throw new AppError("Tài khoản đã tồn tại", 409);
  }

  // ----- hash password -----
  const passwordHash = await bcrypt.hash(password, 12);

  // ----- lưu user -----
  const insertResult = await pool.query(
    `
    INSERT INTO users(email, password_hash)
    VALUES($1, $2)
    RETURNING id, email
    `,
    [email, passwordHash]
  );
  
    const user = insertResult.rows[0]

     // ----- Tạo Verification Token -----
  const verifyToken = crypto.randomBytes(32).toString("hex");

  // ----- hash verify token -----
  const tokenHash = crypto
    .createHash("sha256")
    .update(verifyToken)
    .digest("hex");

  // ----- lưu database -----
  await pool.query(
    `
    INSERT INTO email_verification_tokens (user_id, token_hash, expires_at)
    VALUES ($1, $2, NOW() + interval '30 minutes')
    `,
    [user.id, tokenHash]
  );
  
  return {
    message: "Đăng ký thành công, chúng tôi đã gửi liên kết xác thực đến email của bạn",
    verifyToken
  };
}

module.exports = {
    register,
};