const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { loginUser, registerUser } = require("../controllers/userController");

// CREATE USER

router.post("/register", registerUser);
router.post("/login", loginUser);

router.get("/users", async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
