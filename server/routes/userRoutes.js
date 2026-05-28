const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  loginUser,
  registerUser,
  checkEmail,
  sendOtp,
  verifyOtp,
  sendResetLink,
  resetPassword,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

// CREATE USER

router.post("/register", registerUser);
router.post("/login", loginUser);

router.post("/check-email", checkEmail);

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

router.post("/forgot-password", sendResetLink);

router.post("/reset-password", resetPassword);

router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/users", authMiddleware, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
