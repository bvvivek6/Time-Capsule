require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {
  initScheduler,
  scheduleDailyCheck,
} = require("./services/schedularService");
const authRoutes = require("./routes/authRoutes");
const capsuleRoutes = require("./routes/capsuleroutes");
const errorMiddleware = require("./middlewares/errorMiddleware");
const scheduleService = require("./services/schedularService");
const rateLimit = require("express-rate-limit");

const PORT = process.env.PORT || 3000;

// Debug: log the request origin
app.use((req, res, next) => {
  console.log("Request Origin:", req.headers.origin);
  next();
});

// CORS middleware FIRST
const mongoose = require("mongoose");
require("dotenv").config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
  });

app.get("/", (req, res) => {
  res.send("Hello from the server side!!");
});

//connet to db
require("./config/db");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

app.use("/api/", limiter);
app.use("/api/auth", authRoutes);
app.use("/api/capsules", capsuleRoutes);
app.use(errorMiddleware);

initScheduler();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
