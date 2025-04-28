const nodemailer = require("nodemailer");
const scheduleService = require("./schedularService");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

exports.sendUnlockNotification = async (
  email,
  name,
  capsuleTitle,
  capsuleId
) => {
  try {
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: `Your Time Capsule "${capsuleTitle}" is now unlocked!`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>Hello ${name || "there"}!</h2>
          <p>Great news! Your time capsule "${capsuleTitle}" is now unlocked and ready to view.</p>
          <p>Click the button below to view your memories:</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${process.env.FRONTEND_URL}/capsules/${capsuleId}" 
               style="background-color: #4CAF50; color: white; padding: 12px 20px; text-decoration: none; border-radius: 4px; font-weight: bold;">
              View Time Capsule
            </a>
          </div>
          <p>If you didn't create this time capsule, please ignore this email.</p>
          <p>Best regards,<br>Time Capsule App Team</p>
        </div>
      `,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

// Schedule email for a future date
exports.scheduleUnlockEmail = (capsuleId, unlockDate) => {
  scheduleService.scheduleTask(unlockDate, async () => {
    const TimeCapsule = require("../models/capsule.model");
    const capsule = await TimeCapsule.findById(capsuleId);

    if (!capsule || capsule.isUnlocked) return;

    capsule.isUnlocked = true;
    await capsule.save();

    // Send emails to recipients
    for (const recipient of capsule.recipients) {
      await this.sendUnlockNotification(
        recipient.email,
        recipient.name,
        capsule.title,
        capsule._id
      );
      recipient.notified = true;
    }

    await capsule.save();
  });
};
