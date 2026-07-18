const express = require("express");
const pool = require("./config/db");
const authRoutes = require("./auth/routes");
const { errorHandler } = require("./middlewares/ErrorHandler");

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use(errorHandler);

module.exports = app;
