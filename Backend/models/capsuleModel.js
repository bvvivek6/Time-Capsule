const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema(
  {
    senderName: { type: String },
    senderEmail: { type: String },
    recipientName: { type: String },
    recipientEmail: { type: String },
    title: { type: String },
    message: { type: String },
    mediaUrl: { type: [String] },
    unlockDate: { type: Date },
    publicId: { type: String },
    isopen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("capsule", capsuleSchema);
