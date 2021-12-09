require("dotenv/config");
require("./db");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ name: "Adrian" }));

// Auth routes handling in app.js
const authRouter = require("./routes/auth.routes");
app.use("/auth", authRouter);

const eventRouter = require("./routes/event.routes")
app.use("/events", eventRouter);

module.exports = app;

