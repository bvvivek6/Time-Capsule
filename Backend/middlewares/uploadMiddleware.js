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
    folder: "Timecapsules",
    format: async (req, file) => file.mimetype.split("/")[1], // Dynamically set format based on file type
    public_id: (req, file) => {
      return file.originalname.split(".")[0] + "-" + Date.now();
    },
  },
});

// Configure the multer storage
const cloudinaryFileUploader = multer({ storage });
const uploadMultiple = cloudinaryFileUploader.array("mediaFiles", 10); // Accept up to 10 files

module.exports = uploadMultiple;
