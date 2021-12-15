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
  address: String,
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  icon: String,
  date: Object,
  time: String,
  maxAtendees: Number,
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

module.exports = model("Event", eventsSchema);
