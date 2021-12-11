const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const eventsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
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
  date: Object,
  maxAtendees: Number,
});

module.exports = model("Event", eventsSchema);
