const express = require("express");
const User = require("../models/Users.model");
const mongoose = require("mongoose");
const router = express.Router();

// we should have this impoted from a utils folder
const createResponseObject = require("../utils/createResponseObject");

// GET - DISPLAYS ALL USERS
router.get("/", async (req, res) => {
  try {
    const allUsers = await User.find();
    res
      .status(200)
      .json(
        createResponseObject(
          allUsers,
          200,
          "Successfuly retrieved list of users from database",
          null
        )
      );
  } catch (err) {
    console.log(err);
  }
});

// GET - FINDS ONE USER
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const foundUser = await User.findById(userId);
    res
      .status(200)
      .json(
        createResponseObject(
          foundUser,
          200,
          `Here's the user from the database with the id: ${userId}`,
          null
        )
      );
  } catch (err) {
    console.log(err);
  }
});

// PUT - EDITS USER INFO
router.put("/:userId/edit", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(400).json({ message: "Specified id is not valid" });
      return;
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.json(updatedUser);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
