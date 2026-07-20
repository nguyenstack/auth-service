const authService = require("./service");

// ----- logOut -----
async function logOut(req, res) {
  const { refreshToken } = req.body;

  const logoutResult = await authService.logOut(refreshToken);

  res.status(200).json(logoutResult);
}

module.exports = {
  logOut,
};
