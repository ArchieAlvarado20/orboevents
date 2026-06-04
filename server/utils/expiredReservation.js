const cron = require("node-cron");
const { expireReservations } = require("../controllers/reservationController"); // ✅ i-import

cron.schedule("* * * * *", async () => {
  console.log("Checking expired reservations...");
  await expireReservations();
});
