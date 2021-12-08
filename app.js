require("dotenv/config");
require("./db");

const express = require("express");
const app = express();

app.use(express.json());

app.get("/", (req, res) => res.status(200).json({ name: "Adrian" }));

module.exports = app;

