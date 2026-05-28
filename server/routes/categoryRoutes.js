const express = require("express");

const {
  createCategory,
  getCategories,
  getCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const router = express.Router();

// Public route to get all categories
router.get("/public", getCategories);

router.post("/", createCategory);

router.get("/", authMiddleware, adminMiddleware, getCategories);

router.get("/:id", getCategory);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;
