// controllers/capsule.controller.js
const TimeCapsule = require("../models/capsuleModel");
const cloudinary = require("../config/cloudinary");
const emailService = require("../services/emailService");

//
exports.createCapsule = async (req, res, next) => {
  try {
    const { title, message, recipientsEmail, recipientsName, unlockDate } =
      req.body;
    const mediaFiles = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        mediaFiles.push({
          url: file.path,
          publicId: file.filename,
        });

        console.log("File processed with public_id:", file.filename);
      }
    }

    const capsule = new TimeCapsule({
      userId: req.user.id,
      sentBy: req.user.id,
      title,
      message,
      mediaFiles,
      recipientsEmail,
      recipientsName,
      unlockDate: new Date(unlockDate),
    });

    await capsule.save();

    res.status(201).json({
      message: "Time capsule created successfully",
      capsule,
    });
  } catch (error) {
    console.error(error);
    next(error);
  }
};
// Get all capsules created by logged-in user
exports.getUserCapsules = async (req, res, next) => {
  try {
    const capsules = await TimeCapsule.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({ capsules });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

// Get capsule by ID (with unlock logic)
exports.getCapsuleById = async (req, res, next) => {
  try {
    const capsule = await TimeCapsule.findById(req.params.id);

    if (!capsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }

    // Check if user owns the capsule
    if (capsule.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const now = new Date();

    if (capsule.unlockDate > now && !capsule.isUnlocked) {
      return res.status(403).json({
        message: "This time capsule is still locked",
        unlockDate: capsule.unlockDate,
      });
    }

    // If capsule was not unlocked yet, mark as unlocked now
    if (!capsule.isUnlocked) {
      capsule.isUnlocked = true;
      await capsule.save();

      await emailService.sendUnlockNotification(
        capsule.recipientsEmail,
        capsule.recipientsName,
        capsule.title,
        capsule._id
      );
    }

    res.status(200).json({ capsule });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

exports.deleteCapsule = async (req, res, next) => {
  try {
    const capsule = await TimeCapsule.findById(req.params.id);

    if (!capsule) {
      return res.status(404).json({ message: "Capsule not found" });
    }

    // Delete all media files from Cloudinary
    if (capsule.mediaFiles && capsule.mediaFiles.length > 0) {
      for (const media of capsule.mediaFiles) {
        let resourceType = "auto"; // Default is 'auto'

        // Checking based on the file extension or content type
        if (media.url.includes("video")) {
          resourceType = "video"; // Handle video type
        } else if (media.url.includes("image")) {
          resourceType = "image"; // Handle image type
        }

        try {
          // Delete the file from Cloudinary using publicId and resourceType
          const result = await cloudinary.uploader.destroy(media.publicId, {
            resource_type: resourceType,
          });

          if (result.result !== "ok") {
            console.log(
              `Failed to delete media with publicId: ${media.publicId}`
            );
          }
        } catch (cloudinaryError) {
          console.error(
            `Error deleting media from Cloudinary for ${media.publicId}:`,
            cloudinaryError
          );
        }
      }
    }

    // Delete the capsule from DB
    await TimeCapsule.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Capsule deleted successfully" });
  } catch (error) {
    console.error("Error deleting capsule:", error);
    next(error);
  }
};
