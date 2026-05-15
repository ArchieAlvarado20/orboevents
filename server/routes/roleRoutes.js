const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
} = require("../controllers/roleController");
const permissionMiddleware = require("../middleware/permissionMiddleware");

router.post("/", createRole);

router.get(
  "/",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware("MANAGE_ROLES"),
  getRoles,
);

router.get("/:id", getRoleById);

router.put("/:id", updateRole);

router.delete("/:id", deleteRole);

module.exports = router;
