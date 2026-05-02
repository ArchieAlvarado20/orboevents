const express = require("express");
const router = express.Router();

const {
  checkout,
  getUserTransactions,
  getTransactionById,
} = require("../controllers/transactionController");

// 🧾 CREATE CHECKOUT
router.post("/checkout", checkout);

// 📜 GET all user transactions
router.get("/user/:userId", getUserTransactions);

// 🔍 GET single transaction
router.get("/:id", getTransactionById);

module.exports = router;
