const express = require("express");
const User = require("../models/Users.model");
const Event = require("../models/Events.model");
const Comment = require("../models/Comments.model");
const mongoose = require("mongoose");
const router = express.Router();

const createResponseObject = require("../utils/createResponseObject");

router.route("/").post(async (req, res) => {
  try {
    console.log(req.body);
    const { content, authorId, eventId } = req.body;
    const newComment = await Comment.create({ content, author: authorId });
    const eventCommentedOn = await Event.findByIdAndUpdate(eventId, {
      $push: { comments: newComment._id },
    });
    res
      .status(200)
      .json(
        createResponseObject(
          true,
          res.statusCode,
          "comment posted",
          eventCommentedOn
        )
      );
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
