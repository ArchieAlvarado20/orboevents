const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Role = require("../models/Role");

const fs = require("fs");

const cloudinary = require("../config/cloudinary");

const createUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, status } = req.body;

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
      status,
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

const getUsers = async (req, res) => {
  try {
    const userRole = await Role.findOne({ name: "User" });

    if (!userRole) {
      return res.status(404).json({ message: "User role not found" });
    }

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

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid user ID",
      });
    }

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { name, email, role, phone, status } = req.body;

    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;
    user.phone = phone || user.phone;
    user.status = status || user.status;

    let imageUrl = "";

    if (req.file?.path) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "SmartTicketing/Users/",
        public_id: `${Date.now()}`,
      });

      imageUrl = result.secure_url;

      fs.unlinkSync(req.file.path);

      user.image = imageUrl;
    }

    await user.save();

    res.status(200).json({
      message: "User updated successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
      userId: req.params.id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getUsers, createUser, getUserById, updateUser, deleteUser };
