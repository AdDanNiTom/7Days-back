const express = require("express");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const User = require("../models/Users.model");
const mongoose = require("mongoose");
const { isAuthenticated } = require('./../middleware/jwt.middleware.js');

const router = express.Router();
const saltRounds = 10;


// POST /auth/signup  - Creates a new user in the database
router.get('/', (req, res, next) => {
    const allUsers = User.find()
});


// POST  /auth/login - Verifies email and password and returns a JWT
router.get('/:id', (req, res, next) => {
    
});


// GET  /auth/verify  -  Used to verify JWT stored on the client
router.get('/verify', isAuthenticated, (req, res, next) => {

  // If JWT token is valid the payload gets decoded by the
  // isAuthenticated middleware and made available on `req.payload`
  console.log(`req.payload`, req.payload);

  // Send back the object with user data
  // previously set as the token payload
  res.status(200).json(req.payload);
});


module.exports = router;