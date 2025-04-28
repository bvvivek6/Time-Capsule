// models/capsule.model.js
const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["image", "video", "audio"],
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
});

const capsuleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sentBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      trim: true,
    },
    mediaFiles: [mediaSchema],
    recipients: [
      {
        email: {
          type: String,
          required: true,
        },
        name: String,
        notified: {
          type: Boolean,
          default: false,
        },
      },
    ],
    unlockDate: {
      type: Date,
      required: true,
    },
    isUnlocked: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

// Index for querying capsules by unlock date
capsuleSchema.index({ unlockDate: 1 });

const TimeCapsule = mongoose.model("TimeCapsule", capsuleSchema);
module.exports = TimeCapsule;
