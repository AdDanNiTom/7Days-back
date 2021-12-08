const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB_URI;
mongoose
  .connect(MONGO_URI)
  .then((x) => {
    console.log(`Connected to Mongo! Database name "${x.connections[0].name}"`);
  })
  .catch((error) => {
    console.log(`Error connecting to mongo: `, error);
  });
