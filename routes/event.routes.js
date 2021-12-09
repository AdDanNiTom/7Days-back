const express = require("express");
const User = require("../models/Users.model");
const Event = require("../models/Events.model");
const mongoose = require("mongoose");
const router = express.Router();

router.get("/", (req, res)=>{
    const allEvents = Event.find()
    res.status(400).json({message:"These are all of the events: " + allEvents})
})

router.post("/new", (req, res)=>{
    const {title, description, location, icon, eventDate, maxAtendees} = req.body

    if (title === "") {
        res.status(400).json({ message: "Please provide a title for the event." });
        return;
    }

    Event.create({title, description, location, attendees: [], icon, eventDate, maxAtendees})
    .then((createdEvent) => {
        // Send a json response containing the new event
        res.status(201).json({createdEvent});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    });

})

module.exports = router;