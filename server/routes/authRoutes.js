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
    const token = jwt.sign(
      {
        id: req.user._id,
        email: req.user.email,
        role: req.user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    const CLIENT_URL =
      process.env.NODE_ENV === "production"
        ? process.env.CLIENT_URL
        : process.env.LOCAL_URL;

    res.redirect(`${CLIENT_URL}/admin/?token=${token}`);
  },
);

router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.json({ success: true });
});

module.exports = router;
