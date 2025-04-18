require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello from the server side!!");
});

//connet to db
require("./models/db");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
