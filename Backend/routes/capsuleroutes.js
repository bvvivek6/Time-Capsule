const express = require("express");
const capsuleController = require("../controllers/capsuleController");
const authMiddleware = require("../middlewares/authMiddleware");
const uploadMultiple = require("../middlewares/uploadMiddleware");

const router = express.Router();

// Protect all routes
router.use(authMiddleware);

router.post("/", uploadMultiple, capsuleController.createCapsule);

router.get("/", capsuleController.getUserCapsules);
router.get("/:id", capsuleController.getCapsuleById);
router.delete("/:id", capsuleController.deleteCapsule);

module.exports = router;
