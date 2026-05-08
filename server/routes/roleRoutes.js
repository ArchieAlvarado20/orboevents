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

router.post("/", createRole);

router.get("/", authMiddleware, adminMiddleware, getRoles);

router.get("/:id", getRoleById);

router.put("/:id", updateRole);

router.delete("/:id", deleteRole);

module.exports = router;
