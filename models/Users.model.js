const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
  username: {
    type: String,
    unique: true, // `username` must be unique
  },
  firstName: String,
  email: {
    type: String,
    unique: true, // `email` must be unique
  },
  lastName: String,
  password: String,
  description: String,
  profilePhoto: String,
});

module.export = model("User", usersSchema);
