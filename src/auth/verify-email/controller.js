const authService = require("./service");

// ----- verifyEmail -----
async function verifyEmail(req, res) {
  const { token } = req.query;

  const result = await authService.verifyEmail(
    token
  );

  res.status(200).json(result)
}

module.exports = {
  verifyEmail,
}