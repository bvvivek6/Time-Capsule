require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { initScheduler } = require("./services/schedularService");
const authRoutes = require("./routes/authRoutes");
const capsuleRoutes = require("./routes/capsuleRoutes");

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Hello from the server side!!");
});

//connet to db
require("./config/db");

//middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes
app.use("/api/auth", authRoutes);
// app.use("/api/capsules", capsuleRoutes);

// Initialize scheduler
initScheduler();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
