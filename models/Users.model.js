const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
  username: {
    type: String,
    // unique: true, // `username` must be unique
    required: true,
  },
  firstName: String,
  email: {
    type: String,
    unique: true, // `email` must be unique
    required: true,
  },
  lastName: String,
  password: String,
  biography: String,
  profilePhoto: {
    type: String,
    default: "https://180dc.org/wp-content/uploads/2016/08/default-profile.png"
  }
});

module.exports = model("User", usersSchema);
