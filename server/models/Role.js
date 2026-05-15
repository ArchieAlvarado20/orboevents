const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema(
  {
    // Role Name
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    // Description
    description: {
      type: String,
      trim: true,
    },

    // Permissions
    permissions: [
      {
        type: String,
      },
    ],

    // Status
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },

    // Optional scope support
    accessLevel: {
      type: String,
      enum: ["super", "admin", "staff", "user"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Role", roleSchema);
