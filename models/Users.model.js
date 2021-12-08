const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    username: {
        type: String,
        unique: true, // `username` must be unique
        required: true
      },
    firstName: String,
    email: {
        type: String,
        unique: true, // `email` must be unique
        required: true
      },
    lastName: String,
    password: {
      type: String, 
      required: true
    },
    description: String,
    profilePhoto: String,
})

module.exports = model("User", usersSchema)