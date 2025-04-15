require("dotenv").config();
const mongoose = require("mongoose");

const DB_URL = process.env.MONGODB_URI;

mongoose
  .connect(DB_URL)
  .then(() => {
    console.log("Connected to mongoDb");
  })
  .catch((err) => {
    console.log(err);
  });
