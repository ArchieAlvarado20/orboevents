const express = require("express");
const router = express.Router();
const Razorpay = require("razorpay");

router.use(express.json());

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

router.post("/create-order", async (req, res) => {
  try {
    const options = {
      amount: 4545,
      currency: "INR",
      receipt: "receipt#1",
    };

    const order = await razorpay.orders.create(options);

    res.json(order);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create order" });
  }
});

module.exports = router;
