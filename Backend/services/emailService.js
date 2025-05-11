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
  <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f0f2f; color: #e0f7fa; padding: 30px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 0 15px rgba(0, 255, 255, 0.4);">
    <h2 style="color: #00ffff; text-align: center;">🌌 Hello ${
      name || "there"
    },</h2>

    <p style="font-size: 16px; line-height: 1.6; color: #ccf2ff;">
      Your Time Capsule titled <strong style="color: #00e6e6;">"${capsuleTitle}"</strong> has just been unlocked! 🔓
    </p>

    <p style="font-size: 16px; line-height: 1.6; color: #b3ecff;">
      It's time to revisit your memories. Tap the button below to open your capsule and relive the moment:
    </p>

    <div style="text-align: center; margin: 40px 0;">
      <a href="${process.env.FRONTEND_URL}/capsules/${capsuleId}"
         style="background: linear-gradient(135deg, #00ffff, #00b3b3); color: #000; padding: 14px 30px; border-radius: 30px; font-size: 16px; font-weight: bold; text-decoration: none; box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff;">
        View My Time Capsule 🚀
      </a>
    </div>

    <p style="font-size: 13px; color: #80deea;">
      Didn’t expect this email? You can safely ignore it.
    </p>

    <hr style="border: none; border-top: 1px solid #00ffff; margin: 30px 0;" />

    <p style="font-size: 12px; color: #4dd0e1; text-align: center;">
      ⏳ Made with 💙 by the Time Capsule App Team
    </p>
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
