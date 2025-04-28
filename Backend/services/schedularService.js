const schedule = require("node-schedule");
const TimeCapsule = require("../models/capsuleModel");
const emailService = require("./emailService");

// Initialize scheduler - check for capsules that need to be unlocked
exports.initScheduler = async () => {
  console.log("Initializing capsule scheduler...");

  // Find all capsules that are:
  // 1. Not unlocked yet
  // 2. Unlock date is in the past
  const capsulesToUnlock = await TimeCapsule.find({
    isUnlocked: false,
    unlockDate: { $lte: new Date() },
  });

  console.log(`Found ${capsulesToUnlock.length} capsules to unlock`);

  // Process each capsule
  for (const capsule of capsulesToUnlock) {
    capsule.isUnlocked = true;
    await capsule.save();

    for (const recipient of capsule.recipients) {
      if (!recipient.notified) {
        await emailService.sendUnlockNotification(
          recipient.email,
          recipient.name,
          capsule.title,
          capsule._id
        );
        recipient.notified = true;
      }
    }
    await capsule.save();
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

      // Send notifications
      for (const recipient of capsule.recipients) {
        if (!recipient.notified) {
          await emailService.sendUnlockNotification(
            recipient.email,
            recipient.name,
            capsule.title,
            capsule._id
          );
          recipient.notified = true;
        }
      }
      await capsule.save();
    });
  }
};

// Schedule a task to run at a specific date/time
exports.scheduleTask = (date, task) => {
  return schedule.scheduleJob(date, task);
};

exports.scheduleDailyCheck = () => {
  // Run at 12ap everynighgt
  schedule.scheduleJob("0 0 * * *", async () => {
    console.log("Running daily capsule check...");

    const capsulesToUnlock = await TimeCapsule.find({
      isUnlocked: false,
      unlockDate: { $lte: new Date() },
    });

    console.log(`Found ${capsulesToUnlock.length} capsules to unlock`);

    for (const capsule of capsulesToUnlock) {
      capsule.isUnlocked = true;
      await capsule.save();

      for (const recipient of capsule.recipients) {
        if (!recipient.notified) {
          await emailService.sendUnlockNotification(
            recipient.email,
            recipient.name,
            capsule.title,
            capsule._id
          );
          recipient.notified = true;
        }
      }
      await capsule.save();
    }
  });
};
