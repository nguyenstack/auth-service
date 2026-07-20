const authService = require("./service");

// ----- forgotPassword -----
async function forgotPassword(req, res) {
  const { email } = req.body;

  const result = await authService.forgotPassword(email);

  res.status(200).json(result);
}

module.exports = {
  forgotPassword,
};
