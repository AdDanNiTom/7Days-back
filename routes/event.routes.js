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
      const eventDetails = await Event.findById(eventId);
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

router
  .route("/")
  // GET - Get all events
  .get(async (req, res) => {
    try {
      const allEvents = await Event.find();
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
    const { title, description, icon, eventDate, maxAtendees } = req.body;

    if (!title) {
      //   res
      //     .status(400)
      //     .json(
      //       createResponseObject(
      //         false,
      //         res.statusCode,
      //         "Please provide the required information for the event.",
      //         null
      //       )
      //     );
      //   return;
      res.status(400);
      throw new Error("Please provide the required information for the event.");
    }

    Event.create({
      title,
      description,
      icon,
      attendees: [],
      eventDate,
      maxAtendees,
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
