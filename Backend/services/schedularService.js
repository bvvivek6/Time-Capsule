const schedule = require("node-schedule");
const TimeCapsule = require("../models/capsuleModel");
const emailService = require("./emailService");

// Initialize scheduler - check for capsules that need to be unlocked
exports.initScheduler = async () => {
  console.log("Initializing capsule scheduler...");

  // Find capsules that are:
  // 1. Not unlocked yet
  // 2. Unlock date is already passed
  const capsulesToUnlock = await TimeCapsule.find({
    isUnlocked: false,
    unlockDate: { $lte: new Date() },
  });

  console.log(`Found ${capsulesToUnlock.length} capsules to unlock`);

  for (const capsule of capsulesToUnlock) {
    capsule.isUnlocked = true;
    await capsule.save();

    // Send unlock email
    await emailService.sendUnlockNotification(
      capsule.recipientsEmail,
      capsule.recipientsName,
      capsule.title,
      capsule._id
    );
  }
  // Schedule future capsules
  const futureCapsules = await TimeCapsule.find({
    isUnlocked: false,
    unlockDate: { $gt: new Date() },
  });

  console.log(`Scheduling ${futureCapsules.length} future capsules`);

  for (const capsule of futureCapsules) {
    this.scheduleTask(capsule.unlockDate, async () => {
      capsule.isUnlocked = true;
      await capsule.save();

      // Send unlock email
      await emailService.sendUnlockNotification(
        capsule.recipientsEmail,
        capsule.recipientsName,
        capsule.title,
        capsule._id
      );
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

    const capsulesToUnlock = await TimeCapsule.find({
      isUnlocked: true,
      unlockDate: { $lte: new Date() },
    });

    console.log(`Found ${capsulesToUnlock.length} capsules to unlock`);

    for (const capsule of capsulesToUnlock) {
      capsule.isUnlocked = true;
      await capsule.save();

      // // Send unlock email
      // await emailService.sendUnlockNotification(
      //   capsule.recipientsEmail,
      //   capsule.recipientsName,
      //   capsule.title,
      //   capsule._id
      // );
    }
  });
};
