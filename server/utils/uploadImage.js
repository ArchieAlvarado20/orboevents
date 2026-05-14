const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadImage = async (file, folder = "SmartTicketing/Events") => {
  if (!file) return null;

  const result = await cloudinary.uploader.upload(file.path, {
    folder,
    public_id: `${Date.now()}-${file.originalname}`,
  });

  fs.unlinkSync(file.path);

  return result.secure_url;
};

module.exports = uploadImage;
