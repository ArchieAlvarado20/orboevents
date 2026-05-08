const router = require("express").Router();
const multer = require("multer");
const { getUsers, createUser } = require("../controllers/adminUsersController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");

const upload = multer({ dest: "uploads/" });

router.post(
  "/admin/users",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  createUser,
);

router.get("/admin/users", getUsers);

module.exports = router;
