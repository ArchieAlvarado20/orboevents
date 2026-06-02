const cloudinary = require("../config/cloudinary");
const fs = require("fs/promises");

const uploadImage = async (file, folder = "SmartTicketing/Events") => {
  if (!file) return null;

  try {
    // 1. Validate file type
    if (!file.mimetype.startsWith("image/")) {
      throw new Error("Only image files are allowed");
    }

    // 2. Upload to Cloudinary
    const result = await cloudinary.uploader.upload(file.path, {
      folder,
      public_id: `${Date.now()}-${file.originalname}`,
      resource_type: "image",
    });

    return result.secure_url;
  } catch (err) {
    throw err;
  } finally {
    // 3. Always cleanup temp file (safe way)
    if (file?.path) {
      try {
        await fs.unlink(file.path);
      } catch (cleanupErr) {
        console.error("File cleanup failed:", cleanupErr.message);
      }
    }
  }
};

module.exports = uploadImage;
