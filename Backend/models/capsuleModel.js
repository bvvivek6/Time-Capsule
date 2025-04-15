const mongoose = require("mongoose");

const capsuleSchema = new mongoose.Schema(
  {
    senderId: { type: String },
    senderEmail: { type: String },
    recipientEmail: { type: string },
    title: { type: String },
    message: { type: String },
    mediaUrl: { type: String },
    unlockDate: { type: Date },
    isopen: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Capsule", capsuleSchema);
