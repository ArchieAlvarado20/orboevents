const express = require("express");
const Event = require("../models/Event");
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const fs = require("fs");
const authMiddleware = require("../middleware/authMiddleware");
const adminMiddleware = require("../middleware/adminMiddleware");
const { getEvents } = require("../controllers/eventController");

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// CREATE EVENT (WITH IMAGE UPLOAD)
router.post(
  "/admin/event",
  authMiddleware,
  adminMiddleware,
  upload.single("image"),
  async (req, res) => {
    try {
      let imageUrl = "";

      // upload to Cloudinary if file exists
      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
          folder: "SmartTicketing/Events/",
          public_id: `${Date.now()}-${req.body.name}`,
        });
        imageUrl = result.secure_url;

        // delete local file after upload
        fs.unlinkSync(req.file.path);
      }

      const event = await Event.create({
        ...req.body,
        image: imageUrl,
      });

      res.status(201).json(event);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },
);

// GET ALL EVENTS
router.get("/admin/event", authMiddleware, adminMiddleware, getEvents);

router.get("/event", getEvents);

module.exports = router;
