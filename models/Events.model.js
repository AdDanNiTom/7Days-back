const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventsSchema = new Schema({
  title: String,
  description: String,
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  location: [{ type: Number }, { type: Number }],
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  icon: String,
  eventDate: Date,
  maxAtendees: Number
});

module.export = model("Event", eventsSchema);
