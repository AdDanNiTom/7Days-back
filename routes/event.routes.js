const express = require("express");
const User = require("../models/Users.model");
const Event = require("../models/Events.model");
const mongoose = require("mongoose");
const router = express.Router();

console.log("event.routes.js has been loaded")

// Delete event
router.delete("/delete/:eventId", async (req, res) => {
    try{
        const eventId = req.params.eventId;
        const deletedEvent = await Event.findByIdAndDelete(eventId)
        res.json(deletedEvent)
    } catch(err){
        console.log(err)
    }
})

// Edit event
router.route("/edit/:eventId")
.get(async (req, res) => {
    try{
        const eventId = req.params.eventId;
        const foundEvent = await Event.findById(eventId)
        res.status(201).json(foundEvent)

    } catch(err) {
        console.log(err)
    }
})
.put(async (req, res) => {
    try{
        const { title, description, eventDate, maxAtendees } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(req.params.eventId, {
            title,
            description,
            eventDate,
            maxAtendees
        });
        res.status(201).json({updatedEvent});
    } catch(err) {
        console.log(err)
    }
})

// Show details of an event
router.get("/:eventId", async (req, res) => {
    try{
        const eventId = req.params.eventId;
        const eventDetails = await Event.findById(eventId).populate("owner")
        res.json(eventDetails)
    }
    catch (err){
        console.log(err)
    }
})

// Create a new event
router.post("/new", (req, res)=>{
    console.log("req.body (backend): ",req.body)
    const {title, description, owner, icon, eventDate, maxAtendees} = req.body
    
    if (title === "") {
        res.status(400).json({ message: "Please provide the required information for the event." });
        return;
    }
    
    Event.create({title, description, owner, icon, attendees:[], eventDate, maxAtendees})
    .then((createdEvent) => {
        // Send a json response containing the new event
        console.log("the event has been created")
        res.status(201).json({createdEvent});
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ message: "Internal Server Error" })
    });
    
})

// Get all events
router.route("/")
.get(async (req, res)=>{
    try {
        const allEvents = await Event.find().populate("owner")
        res.json(allEvents)
    }
    catch (err) {
        console.log(err)
    }  
})

module.exports = router;