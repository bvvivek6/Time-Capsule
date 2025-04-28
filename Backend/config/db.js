const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(3000, () => console.log("Server is running on port 3000"));
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });
