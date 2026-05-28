const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");
const { resend } = require("../utils/resend");
const { otpStore } = require("../utils/otpStore");
const crypto = require("crypto");

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role, // ✅ VERY IMPORTANT
      },
      process.env.JWT_SECRET || "secret",
      { expiresIn: "30d" },
    );

    res.json({
      message: "Login successful",
      accessToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, // ✅ ADD ROLE HERE
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    // 🔥 DEFAULT ROLE (User)
    const defaultRole = await Role.findOne({ accessLevel: "user" });

    if (!defaultRole) {
      return res.status(500).json({
        message: "Default role not found",
      });
    }

    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: defaultRole._id,
    });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: defaultRole.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(201).json({
      message: "User created successfully",
      accessToken: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: defaultRole.role,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    res.status(500).json({ message: error.message });
  }
};

const checkEmail = async (req, res) => {
  try {
    const { email } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(200).json({
        exists: true,
      });
    }

    return res.status(200).json({
      exists: false,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

const sendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    otpStore[email] = {
      otp,
      expires: Date.now() + 5 * 60 * 1000,
    };

    await resend.emails.send({
      from: "Orboevents <onboarding@resend.dev>",
      to: email,
      subject: "Your OTP Code",
      html: `
        <div style="font-family:sans-serif">
          <h1>${otp}</h1>
          <p>Your OTP expires in 5 minutes.</p>
        </div>
      `,
    });

    res.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const stored = otpStore[email];

    if (!stored) {
      return res.status(400).json({
        message: "OTP not found",
      });
    }

    if (Date.now() > stored.expires) {
      return res.status(400).json({
        message: "OTP expired",
      });
    }

    if (stored.otp !== otp) {
      return res.status(400).json({
        message: "Invalid OTP",
      });
    }

    delete otpStore[email];

    res.json({
      verified: true,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const sendResetLink = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const token = crypto.randomBytes(32).toString("hex");

    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 mins

    await user.save();

    const resetLink = `${process.env.CLIENT_URL}/reset-password/${token}`;

    await resend.emails.send({
      from: "Orboevents <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your Orboevents Password",

      html: `
  <div style="font-family: Arial, sans-serif; background:#f6f7fb; padding:40px;">
    <div style="max-width:520px; margin:0 auto; background:#ffffff; border-radius:16px; padding:32px; box-shadow:0 10px 30px rgba(0,0,0,0.08);">

      <h1 style="color:#6d28d9; font-size:24px; margin-bottom:10px;">
        Orboevents
      </h1>

      <h2 style="font-size:20px; color:#111827; margin-bottom:16px;">
        Reset Your Password
      </h2>

      <p style="font-size:14px; color:#4b5563; line-height:1.6;">
        We received a request to reset your password. Click the button below to create a new password.
        This link will expire in <strong>15 minutes</strong> for your security.
      </p>

      <div style="text-align:center; margin:28px 0;">
        <a href="${resetLink}"
          style="
            background:#6d28d9;
            color:#ffffff;
            padding:12px 24px;
            border-radius:10px;
            text-decoration:none;
            font-weight:bold;
            display:inline-block;
          ">
          Reset Password
        </a>
      </div>

      <p style="font-size:12px; color:#6b7280; line-height:1.5;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>

      <p style="font-size:12px; color:#6d28d9; word-break:break-all;">
        ${resetLink}
      </p>

      <hr style="margin:24px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:12px; color:#9ca3af;">
        If you didn’t request this, you can safely ignore this email.
        Your account is still secure.
      </p>

    </div>

    <p style="text-align:center; font-size:11px; color:#9ca3af; margin-top:16px;">
      © ${new Date().getFullYear()} Orboevents. All rights reserved.
    </p>
  </div>
  `,
    });

    res.json({
      message: "Reset link sent to email",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset link",
      });
    }

    user.password = newPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({
      message: "Password reset successful",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  loginUser,
  registerUser,
  checkEmail,
  sendOtp,
  verifyOtp,
  sendResetLink,
  resetPassword,
};
