require("dotenv").config();
const app = require("./app");
const pool = require("./config/db");

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await pool.query("SELECT NOW()");

    console.log("Dã kết nối database");

    app.listen(PORT, () => {
      console.log(`Server chạy ở cổng ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
}

start();
