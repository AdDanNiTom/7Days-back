const express = require("express");
const User = require("../models/Users.model");
const Event = require("../models/Events.model");
const mongoose = require("mongoose");
const router = express.Router();

const createResponseObject = require("../utils/createResponseObject");

router
  .route("/:eventId")
  // GET - Gets event info
  .get(async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const eventDetails = await Event.findById(eventId).populate(
        "owner attendees"
      );
      res
        .status(200)
        .json(
          createResponseObject(
            true,
            res.statusCode,
            "Retrieved event information successfuly",
            eventDetails
          )
        );
    } catch (err) {
      res
        .status(500)
        .json(createResponseObject(false, res.statusCode, err.message, null));
    }
  })
  // PUT - Edits an event
  .put(async (req, res) => {
    try {
      const { title, description, eventDate, maxAtendees } = req.body;
      const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, {
        title,
        description,
        eventDate,
        maxAtendees,
      });
      res
        .status(200)
        .json(
          createResponseObject(
            true,
            res.statusCode,
            "Event edited successfully",
            updatedEvent
          )
        );
    } catch (err) {
      res
        .status(500)
        .json(createResponseObject(false, res.statusCode, err.message, null));
    }
  })
  // DELETE - Deletes an event
  .delete(async (req, res) => {
    try {
      const eventId = req.params.eventId;
      const deletedEvent = await Event.findByIdAndDelete(eventId);
      res
        .status(200)
        .json(
          createResponseObject(
            true,
            res.statusCode,
            "Event deleted successfully",
            deletedEvent
          )
        );
    } catch (err) {
      res
        .status(500)
        .json(createResponseObject(false, res.statusCode, err.message, null));
    }
  });

router.route("/:eventId/attendees").put(async (req, res) => {
  try {
    let attendedEvent = null
    let attendingMsg = ""
    const { userId } = req.body;
    const selectedEvent = await Event.findById(req.params.eventId);
    if (selectedEvent.attendees.includes(userId)) {
      attendedEvent = await Event.findByIdAndUpdate(req.params.eventId, {
        $pull: { attendees: userId },
      });
      attendingMsg = "not attending"
    } else {
      attendedEvent = await Event.findByIdAndUpdate(req.params.eventId, {
        $addToSet: { attendees: userId },
      });
      attendingMsg = "attending"
    }
    
    res
      .status(200)
      .json(
        createResponseObject(
          true,
          res.statusCode,
          `You are ${attendingMsg} the event`,
          attendedEvent
        )
      );
  } catch (err) {
    res
      .status(500)
      .json(createResponseObject(false, res.statusCode, err.message, null));
  }
});

router
  .route("/")
  // GET - Get all events
  .get(async (req, res) => {
    try {
      // build empty filter object
      const filter = {};

      // filter events by day
      const { day, category } = req.query;
      if (day) filter["date.weekday"] = Number(day);
      // filter events by category
      if (category) filter["icon"] = category;

      // mongoose .find()
      const allEvents = await Event.find(filter).populate("owner attendees");

      // send response
      res
        .status(200)
        .json(
          createResponseObject(
            true,
            res.statusCode,
            "List of events retrieved successfully",
            allEvents
          )
        );
    } catch (err) {
      res
        .status(500)
        .json(createResponseObject(false, res.statusCode, err.message, null));
    }
  })
  // POST - Create a new event
  .post((req, res) => {
    const {
      title,
      description,
      owner,
      icon,
      eventDate,
      maxAtendees,
      location,
      address,
    } = req.body;

    if (!title) {
      res.status(400);
      throw new Error("Please provide the required information for the event.");
    }

    console.log(typeof eventDate);

    const date = {
      fullDate: eventDate,
      weekday: new Date(eventDate).getDay(),
    };

    Event.create({
      title,
      description,
      owner,
      icon,
      attendees: [],
      date,
      maxAtendees,
      location,
      address,
    })
      .then((createdEvent) => {
        // Send a json response containing the new event
        res
          .status(201)
          .json(
            createResponseObject(
              true,
              res.statusCode,
              "the event has been created",
              createdEvent
            )
          );
      })
      .catch((err) => {
        res
          .status(500)
          .json(createResponseObject(false, res.statusCode, err.message, null));
      });
  });

module.exports = router;
