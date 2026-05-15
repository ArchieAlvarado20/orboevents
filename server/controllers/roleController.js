const Role = require("../models/Role");

/**
 * CREATE ROLE
 */
exports.createRole = async (req, res) => {
  try {
    const { name, description, permissions, accessLevel } = req.body;

    // check existing role
    const existingRole = await Role.findOne({ name });

    if (existingRole) {
      return res.status(400).json({
        message: "Role already exists",
      });
    }

    const role = await Role.create({
      name,
      description,
      permissions,
      accessLevel,
    });

    res.status(201).json({
      message: "Role created successfully",
      role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * GET ALL ROLES
 */
exports.getRoles = async (req, res) => {
  try {
    const roles = await Role.find({
      name: { $ne: "User" },
    }).sort({ createdAt: -1 });

    res.status(200).json(roles);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
/**
 * GET SINGLE ROLE
 */
exports.getRoleById = async (req, res) => {
  try {
    const { id } = req.params;

    // 🔥 validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid role ID",
      });
    }

    const role = await Role.findById(id);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * UPDATE ROLE
 */
exports.updateRole = async (req, res) => {
  try {
    const { name, description, permissions, status, accessLevel } = req.body;

    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    role.name = name || role.name;
    role.description = description || role.description;
    role.permissions = permissions || role.permissions;
    role.status = status || role.status;
    role.accessLevel = accessLevel || role.accessLevel;

    await role.save();

    res.status(200).json({
      message: "Role updated successfully",
      role,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/**
 * DELETE ROLE
 */
exports.deleteRole = async (req, res) => {
  try {
    const role = await Role.findById(req.params.id);

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    await role.deleteOne();

    res.status(200).json({
      message: "Role deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
