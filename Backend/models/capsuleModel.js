const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema({
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
    sentById: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sentBy: {
      type: String,
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
    recipientsEmail: {
      type: String,
      required: true,
    },
    recipientsName: {
      type: String,
      required: true,
    },
    unlockDate: {
      type: Date,
      required: true,
    },
    isUnlocked: {
      type: Boolean,
      default: false,
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
