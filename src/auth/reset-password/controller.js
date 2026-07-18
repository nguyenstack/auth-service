const authService = require("./service");

// ----- resetPassword -----
async function resetPassword(req, res) {
  const { resetToken, newPassword } = req.body;

  const result = await authService.resetPassword(
    resetToken,
    newPassword
  );

  res.status(200).json(result);
}

module.exports = {
  resetPassword,
};