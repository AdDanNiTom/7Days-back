const express = require("express");
const User = require("../models/Users.model");
const mongoose = require("mongoose");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");
const createResponseObject = require("../utils/createResponseObject");

// TO CREATE - POST 'api/upload'
router.post(
  "/upload",
  fileUploader.single("profilePhoto"),
  (req, res, next) => {
    if (!req.file) {
      next(new Error("No file uploaded"));
      return;
    }
    // GET the URL of the uploaded file and send it as a response
    res.json({ secure_url: req.file.path });
  }
);

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
    res
      .status(500)
      .json(createResponseObject(false, res.statusCode, err.message, null));
  }
});

router
  .route("/:userId")

  // GET - FINDS ONE USER
  .get(async (req, res) => {
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
  })

  // PUT - EDIT USER INFO
  .put(async (req, res) => {
    try {
      const { userId } = req.params;

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        res.status(404);
        throw new Error("Specified id is not valid");
      }
      console.log("req.body ==> ", req.body);
      const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      console.log("updated user", updatedUser);

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
  })

  // DELETE - DELETE A USER
  .delete(async (req, res) => {
    try {
      const { userId } = req.params;
      const deletedUser = await User.findByIdAndDelete(userId);
      res
        .status(200)
        .json(
          createResponseObject(
            true,
            res.statusCode,
            "User account successfully deleted",
            deletedUser
          )
        );
    } catch (err) {
      res
        .status(500)
        .json(createResponseObject(false, res.statusCode, err.message, null));
    }
  });

module.exports = router;
