const cron = require("node-cron");
const Event = require("../models/Event");

cron.schedule("*/10 * * * *", async () => {
  const now = new Date();

  const events = await Event.find({
    status: { $ne: "completed" },
  }).populate("slot");

  for (const event of events) {
    const slots = event.slot || [];

    const allCompleted =
      slots.length > 0 && slots.every((s) => new Date(s.date) < now);

    if (allCompleted) {
      event.status = "completed";
      await event.save();
    }
    console.log("Events found:", event.length);
  }
});
