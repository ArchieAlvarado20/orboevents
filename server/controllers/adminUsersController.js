const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");

const fs = require("fs");

const cloudinary = require("../config/cloudinary");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, phone } = req.body;

    const existing = await User.findOne({ email });

    if (existing) {
      return res.status(400).json({
        message: "Email already exists",
      });
    }

    let imageUrl = "";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "SmartTicketing/Users/",
        public_id: `${Date.now()}-${name}`,
      });

      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
      image: imageUrl,
    });

    const safeUser = await User.findById(user._id)
      .select("-password")
      .populate("role");

    res.status(201).json(safeUser);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createUser,
};

const getUsers = async (req, res) => {
  try {
    const userRole = await Role.findOne({ name: "User" });

    const users = await User.find({
      role: { $ne: userRole._id },
    })
      .select("-password")
      .populate("role");

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getUsers, createUser };
