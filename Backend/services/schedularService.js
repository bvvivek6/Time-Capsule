const cron = require("node-cron");
const Capsule = require("../models/capsuleModel");
const emailService = require("./emailService");

// Initialize the scheduler that checks for capsules ready to be unlocked

exports.initScheduler = () => {
  // Run every day at midnight (00:00)
  cron.schedule("0 0 * * *", async () => {
    console.log("Running capsule unlock scheduler job...");
    await unlockReadyCapsules();
  });

  console.log("Capsule unlock scheduler initialized");
};

//Check and unlock capsules that have reached their unlock date

const unlockReadyCapsules = async () => {
  try {
    const currentDate = new Date();

    // Find all capsules that should be unlocked
    const capsulesToUnlock = await Capsule.find({
      isOpen: false,
      unlockDate: { $lte: currentDate },
    });

    console.log(`Found ${capsulesToUnlock.length} capsules to unlock`);

    // Process each capsule
    for (const capsule of capsulesToUnlock) {
      try {
        // Update capsule status
        capsule.isOpen = true;
        await capsule.save();

        // Send notification email
        await emailService.sendCapsuleUnlockedEmail(capsule);

        console.log(`Successfully unlocked capsule ${capsule._id}`);
      } catch (err) {
        console.error(`Error processing capsule ${capsule._id}:`, err);
      }
    }
  } catch (error) {
    console.error("Error in unlockReadyCapsules:", error);
  }
};
