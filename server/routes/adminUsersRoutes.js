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

const upload = multer({ dest: "uploads/" });

router.post(
  "/admin/users",
  upload.single("image"),
  authMiddleware,
  adminMiddleware,
  createUser,
);

router.get("/admin/users", authMiddleware, adminMiddleware, getUsers);

router.get("/admin/users/:id", getUserById);

router.put("/admin/users/:id", upload.single("image"), updateUser);

router.delete("/admin/users/:id", deleteUser);
module.exports = router;
