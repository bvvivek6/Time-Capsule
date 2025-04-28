// routes/auth.routes.js
const express = require("express");
const { body } = require("express-validator");
const authController = require("../controllers/authController");

const router = express.Router();

router.post(
  "/signup",
  [
    body("name").trim().not().isEmpty().withMessage("Name is required"),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Valid email is required"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  authController.signup
);

router.post(
  "/login",
  [body("email").isEmail().normalizeEmail(), body("password").not().isEmpty()],
  authController.login
);

router.post("/logout", authController.logout);

module.exports = router;
