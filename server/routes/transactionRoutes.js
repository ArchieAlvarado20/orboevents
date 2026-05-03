const express = require("express");
const router = express.Router();

const {
  checkout,
  getUserTransactions,
  getTransactionById,
  paymentSuccess,
} = require("../controllers/transactionController");

const authMiddleware = require("../middleware/authMiddleware");

// 🧾 CREATE CHECKOUT
router.post("/checkout", authMiddleware, checkout);

router.post("/success", paymentSuccess);

// 📜 GET all user transactions
router.get("/user/:userId", getUserTransactions);

// 🔍 GET single transaction
router.get("/:id", getTransactionById);

module.exports = router;
