const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Set up multer storage using Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "time_capsules",
    format: async (req, file) => {
      const mimeType = file.mimetype.split("/")[1]; // Get format from MIME type
      const supportedFormats = [
        "jpeg",
        "png",
        "gif",
        "jpg",
        "mp4",
        "avi",
        "mp3",
        "wav",
      ]; // Example formats

      if (supportedFormats.includes(mimeType)) {
        return mimeType; // Return MIME type as format
      } else {
        throw new Error("Unsupported file format");
      }
    },
    public_id: (req, file) => {
      const cleanName = file.originalname
        .split(".")[0]
        .replace(/[^a-zA-Z0-9]/g, "_");
      return `${cleanName}-${Date.now()}`;
    },
  },
});

// Configure the multer storage
const cloudinaryFileUploader = multer({ storage });
const uploadMultiple = cloudinaryFileUploader.array("mediaFiles", 10); // Accept up to 10 files

module.exports = uploadMultiple;
