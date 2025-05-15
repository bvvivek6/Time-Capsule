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

app.get("/", (req, res) => {
  res.send("Hello from the server side!!");
});

//connet to db
require("./config/db");

app.use(
  cors({
    origin: process.env.FRONT_END_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
