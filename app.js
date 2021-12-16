require("dotenv/config");
const express = require("express");
const app = express();
require("./config")(app);
require("./db");

app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => res.render("index"));

// Auth routes handling in app.js
const authRouter = require("./routes/auth.routes");
const usersRouter = require("./routes/users.routes");
const eventRouter = require("./routes/event.routes");
const commentsRouter = require("./routes/comments.routes");

app.use("/auth", authRouter);
app.use("/api/users", usersRouter);
app.use("/api/events", eventRouter);
app.use("/api/comments", commentsRouter);

module.exports = app;
