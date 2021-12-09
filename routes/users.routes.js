const express = require("express");
const User = require("../models/Users.model");
const mongoose = require("mongoose");
const router = express.Router();

// GET - DISPLAYS ALL USERS
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res.json(allUsers);
  } catch (err) {
    console.log(err);
  }
});

// GET - FINDS ONE USER
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const oneUser = await User.findById(id);
    res.json(oneUser);
  } catch (err) {
    console.log(err);
  }
});

// PUT - EDITS USER INFO
router.put("/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.body);
    if (!mongoose.Types.ObjectId.isValid(id)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
