const bcrypt = require("bcryptjs");
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
  
  return insertResult.rows[0];
}

module.exports = {
    register,
};