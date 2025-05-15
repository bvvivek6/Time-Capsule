const schedule = require("node-schedule");
const TimeCapsule = require("../models/capsuleModel");
const emailService = require("./emailService");


async function checkAndUnlockCapsules() {
  // Find all capsules to unlock
  const capsulesToUnlock = await TimeCapsule.find({
    isUnlocked: false,
    unlockDate: { $lte: new Date() },
  });

  if (!capsulesToUnlock.length) {
    console.log("No capsules to unlock.");
    return;
  }

  const recipientCapsules = {};
  for (const capsule of capsulesToUnlock) {
    capsule.isUnlocked = true;
    await capsule.save();
    // recipientsEmail and recipientsName are strings (comma-separated for multiple)
    const emails = capsule.recipientsEmail.split(",").map((e) => e.trim());
    const names = capsule.recipientsName.split(",").map((n) => n.trim());
    emails.forEach((email, idx) => {
      if (!recipientCapsules[email]) recipientCapsules[email] = [];
      // Attach name for this recipient
      recipientCapsules[email].push({ capsule, name: names[idx] || "there" });
    });
  }

  // For each recipient, send a single summary email
  for (const email in recipientCapsules) {
    const items = recipientCapsules[email];
    const capsules = items.map((i) => i.capsule);
    const names = items.map((i) => i.name);

    const greeting = [...new Set(names)].join(", ");
    await emailService.sendUnlockSummaryEmail(email, greeting, capsules);
  }
}

exports.initScheduler = async () => {
  console.log("Initializing capsule scheduler...");
  await checkAndUnlockCapsules();

  const futureCapsules = await TimeCapsule.find({
    isUnlocked: false,
    unlockDate: { $gt: new Date() },
  });
  console.log(`Scheduling ${futureCapsules.length} future capsules`);
  for (const capsule of futureCapsules) {
    this.scheduleTask(capsule.unlockDate, async () => {
      await checkAndUnlockCapsules();
    });
  }
};

exports.scheduleTask = (date, task) => {
  return schedule.scheduleJob(date, task);
};

exports.scheduleDailyCheck = () => {
  // Run every day at 12:00 AM
  schedule.scheduleJob("0 0 * * *", async () => {
    console.log("Running daily capsule check...");
    await checkAndUnlockCapsules();
  });
};
