const authService = require("./service");

// ----- LOGIN -----
async function login(req, res) {
    const { email, password } = req.body;

    const authTokens = await authService.login(
      email,
      password
    );

    res.status(200).json(authTokens)
}

module.exports = {
  login,
};
