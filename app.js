require("dotenv/config");
const express = require("express");
const app = express();
require("./config")(app);
require("./db");


app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ name: "Adrian" }));

// Auth routes handling in app.js
const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/users.routes");

app.use("/auth", authRouter);
app.use("/api/users", usersRouter);

module.exports = app;
