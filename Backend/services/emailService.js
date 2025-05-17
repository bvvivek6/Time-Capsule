const nodemailer = require("nodemailer");
const scheduleService = require("./schedularService");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Send a summary email to the recipient listing all unlocked capsules
exports.sendUnlockSummaryEmail = async (
  recipientEmail,
  recipientName,
  capsules
) => {
  try {
    const capsuleList = capsules
      .map(
        (capsule) => `
      <li style="margin-bottom: 12px;">
        <strong>${capsule.title}</strong> (Unlock Date: ${new Date(
          capsule.unlockDate
        ).toLocaleString()})<br/>
        <a href="${
          process.env.FRONTEND_URL || process.env.FRONT_END_URL
        }/capsules/${capsule._id}" style="color:#00ffff;">View Capsule</a>
      </li>
    `
      )
      .join("");
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: recipientEmail,
      subject: `Your Time Capsule(s) have been unlocked!`,
      html: `
        <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #0f0f2f; color: #e0f7fa; padding: 30px 20px; border-radius: 12px; max-width: 600px; margin: auto; box-shadow: 0 4px 15px rgba(0, 255, 255, 0.2);">
  <h2 style="color: #00ffff; text-align: center;">🌌 Hello ${
    recipientName || "there"
  },</h2>

  <p style="font-size: 16px; line-height: 1.6; color: #cceeff;">
    The following Time Capsule(s) sent to your email have just been unlocked:
  </p>

  <ul style="font-size: 15px; line-height: 1.8; color: #b3ecff; padding-left: 20px;">
    ${capsules
      .map(
        (capsule) => `
      <li>
        <strong>${capsule.title}</strong><br/>
        <small>Unlock Date: ${new Date(
          capsule.unlockDate
        ).toLocaleString()}</small><br/>
        <a href="${
          process.env.FRONTEND_URL || process.env.FRONT_END_URL
        }/capsules/${capsule._id}" 
           style="color: #00ffff; text-decoration: underline;">View Capsule</a>
      </li>`
      )
      .join("")}
  </ul>

  <hr style="border: none; border-top: 1px solid #00ffff; margin: 30px 0;" />

  <p style="font-size: 13px; color: #66ffff; text-align: center;">
    ⏳ Made with 💙 by the <strong style="color: #00e6e6;">Time Capsule</strong> team.
  </p>
</div>

      `,
    };
    const info = await transporter.sendMail(mailOptions);
    console.log("Summary email sent: ", info.response);
    return info;
  } catch (error) {
    console.error("Error sending summary email:", error);
    throw error;
  }
};
