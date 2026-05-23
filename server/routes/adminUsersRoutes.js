const router = require("express").Router();
const multer = require("multer");
const {
  getUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/adminUsersController");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const permissionMiddleware = require("../middleware/permissionMiddleware");

const upload = multer({ dest: "uploads/" });

router.post(
  "/admin/users",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  createUser,
);

router.get(
  "/admin/users",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware("MANAGE_USERS"),
  getUsers,
);

router.get(
  "/admin/users/:id",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware("MANAGE_USERS"),
  getUserById,
);

router.put(
  "/admin/users/:id",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  permissionMiddleware("MANAGE_USERS"),
  updateUser,
);

router.delete(
  "/admin/users/:id",
  authMiddleware,
  adminMiddleware,
  permissionMiddleware("MANAGE_USERS"),
  deleteUser,
);
module.exports = router;
