// middleware/error.middleware.js
module.exports = (err, req, res, next) => {
  console.error(err.stack);

  // Default error status and message
  const status = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  // Handle multer errors
  if (err.name === "MulterError") {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File too large. Maximum size is 50MB",
      });
    }
    return res.status(400).json({ message: err.message });
  }

  // Handle validation errors
  if (err.name === "ValidationError") {
    return res.status(400).json({
      message: "Validation Error",
      errors: Object.values(err.errors).map((e) => e.message),
    });
  }

  // Handle database errors
  if (err.name === "MongoError" || err.name === "MongoServerError") {
    if (err.code === 11000) {
      return res.status(400).json({
        message: "Duplicate key error",
        field: Object.keys(err.keyValue)[0],
      });
    }
  }

  res.status(status).json({
    message,
    stack: process.env.NODE_ENV === "production" ? "🥞" : err.stack,
  });
};
