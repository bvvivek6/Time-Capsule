// controllers/capsule.controller.js
const TimeCapsule = require("../models/capsuleModel");
const cloudinary = require("../config/cloudinary");
const emailService = require("../services/emailService");

exports.createCapsule = async (req, res, next) => {
  try {
    const { title, message, recipients, unlockDate } = req.body;

    const mediaFiles = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "auto",
          folder: "time_capsules",
        });

        mediaFiles.push({
          type: file.mimetype.startsWith("image")
            ? "image"
            : file.mimetype.startsWith("video")
            ? "video"
            : "audio",
          url: result.secure_url,
          publicId: result.public_id,
        });
      }
    }

    const capsule = new TimeCapsule({
      userId: req.user.id,
      title,
      message,
      mediaFiles,
      recipients: JSON.parse(recipients),
      unlockDate: new Date(unlockDate),
    });

    await capsule.save();

    res.status(201).json({
      message: "Time capsule created successfully",
      capsule,
    });
  } catch (error) {
    next(error);
  }
};

exports.getUserCapsules = async (req, res, next) => {
  try {
    const capsules = await TimeCapsule.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json({ capsules });
  } catch (error) {
    next(error);
  }
};

exports.getCapsuleById = async (req, res, next) => {
  try {
    const capsule = await TimeCapsule.findById(req.params.id);

    if (!capsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }

    // Check if user owns this capsule
    if (capsule.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if unlock date has passed
    const now = new Date();
    if (new Date(capsule.unlockDate) > now && !capsule.isUnlocked) {
      return res.status(403).json({
        message: "This time capsule is still locked",
        unlockDate: capsule.unlockDate,
      });
    }

    // If not already marked as unlocked, mark it now
    if (!capsule.isUnlocked) {
      capsule.isUnlocked = true;
      await capsule.save();

      // Send emails to recipients
      for (const recipient of capsule.recipients) {
        if (!recipient.notified) {
          await emailService.sendUnlockNotification(
            recipient.email,
            recipient.name,
            capsule.title,
            capsule._id
          );
          recipient.notified = true;
        }
      }
      await capsule.save();
    }

    res.json({ capsule });
  } catch (error) {
    next(error);
  }
};
