const express = require("express");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const router = express.Router();

// redirect to google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);

// callback
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user;
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role?._id?.toString?.() || user.role.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );
    // redirect to frontend with token
    res.redirect(`${process.env.CLIENT_URL}/?token=${token}`);
  },
);

module.exports = router;
