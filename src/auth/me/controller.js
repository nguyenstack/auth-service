const authService = require("./service");

// ----- ME -----
async function me(req, res) {
  const user = await authService.getMe(
    req.user.userId
  );

  res.status(200).json(user);
}

module.exports = {
  me,
};
