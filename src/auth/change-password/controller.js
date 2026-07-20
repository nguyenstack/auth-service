const authService = require("./service");

// ----- changePassword -----
async function changePassword(req, res) {
  const { currentPassword, newPassword } = req.body;

  const response = await authService.changePassword(
    req.user.userId,
    currentPassword,
    newPassword,
  );

  res.status(200).json(response);
}

module.exports = {
  changePassword,
};
