const authService = require("./service");

// ----- refreshToken -----
async function refresh(req, res) {
    const { refreshToken } = req.body;

    const authTokens = await authService.refresh(
        refreshToken
    );

    res.status(200).json(authTokens);
}

module.exports = {
  refresh,
};