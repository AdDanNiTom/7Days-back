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
          true,
          res.statusCode,
          "Data found successfully",
          allUsers
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

    if (foundUser)
      res
        .status(200)
        .json(
          createResponseObject(
            true,
            res.statusCode,
            `User with id: ${userId} found successfully.`,
            foundUser
          )
        );
    else {
      res.status(404);
      throw new Error("No user found with the specified id.");
    }
  } catch (err) {
    res.json(createResponseObject(false, res.statusCode, err.message, null));
  }
});

// PUT - EDITS USER INFO
router.put("/:userId/edit", async (req, res) => {
  try {
    const { userId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      res.status(404);
      throw new Error("Specified id is not valid");
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
    });

    res
      .status(200)
      .json(
        createResponseObject(
          true,
          res.statusCode,
          "User profile updated successfully.",
          updatedUser
        )
      );
  } catch (err) {
    res.json(createResponseObject(false, res.statusCode, err.message, null));
  }
});

module.exports = router;
