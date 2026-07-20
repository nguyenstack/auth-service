const authService = require("./service");

// ----- REGISTER -----
async function register(req, res) {
  const { email, password } = req.body;

  const registeredUser = await authService.register(email, password);

  res.status(201).json(registeredUser);
}

module.exports = {
  register,
};
