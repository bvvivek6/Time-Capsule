import React, { useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import axios from "axios";
import { toast } from "react-toastify";
import {
  Camera,
  Calendar,
  X,
  Send,
  Gift,
  User,
  Mail,
  Bookmark,
} from "lucide-react";

const CreateCapsule = ({ onCreate }) => {
  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [formStep, setFormStep] = useState(1);
  const [dateInputFocused, setDateInputFocused] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    title: "",
    sentBy: "",
    recipientsName: "",
    recipientsEmail: "",
    unlockDate: "",
    message: "",
  });

  const totalSteps = 2;

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setImages((prevImages) => [...prevImages, ...imageUrls]);
    setImageFiles((prevFiles) => [...prevFiles, ...files]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
    setImageFiles(imageFiles.filter((_, i) => i !== index));
  };

  const nextStep = () => {
    setFormStep(formStep + 1);
  };

  const prevStep = () => {
    setFormStep(formStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("sentBy", form.sentBy);
      formData.append("recipientsName", form.recipientsName);
      formData.append("recipientsEmail", form.recipientsEmail);
      formData.append("unlockDate", form.unlockDate);
      formData.append("message", form.message);

      const token = localStorage.getItem("token");

      // Check the unlock date to be greater than the current date
      const currentDate = new Date();
      const unlockDateObj = new Date(form.unlockDate);
      if (unlockDateObj <= currentDate) {
        toast.error("Unlock date must be greater than the current date.");
        setIsSubmitting(false);
        return;
      }

      // Append all image files by multer in the backend
      imageFiles.forEach((file) => {
        formData.append("mediaFiles", file);
      });

      const baseUrl = import.meta.env.VITE_API_URL;
      const response = await axios.post(`${baseUrl}/capsules`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (onCreate) {
        const newCapsule = {
          ...response.data.capsule,
          images,
        };
        onCreate(newCapsule);
      }

      confetti({
        particleCount: 150,
        spread: 120,
        origin: { y: 0.6 },
        colors: ["#06b6d4", "#8b5cf6", "#3b82f6"],
      });

      toast.success("Time capsule Created successfully!🎊");

      setForm({
        title: "",
        sentBy: "",
        recipientsName: "",
        recipientsEmail: "",
        unlockDate: "",
        message: "",
      });

      setImages([]);
      setImageFiles([]);
      setFormStep(1);
    } catch (error) {
      console.error("Error creating time capsule:", error);
      toast.error("Failed to create time capsule. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const formVariants = {
    hidden: {
      opacity: 0,
      x: 20,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut",
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex justify-center font-mono items-center text-white">
      <motion.div
        className="bg-gray-900 p-8 sm:p-6 md:p-8 rounded-2xl shadow-2xl max-w-xl w-full border border-gray-800"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            {formStep === 1
              ? "Create Your Time Capsule"
              : "Complete Your Capsule"}
          </h2>
          <div className="flex gap-2">
            {[...Array(totalSteps)].map((_, i) => (
              <div
                key={i}
                className={`h-2 w-8 rounded-full ${
                  formStep >= i + 1
                    ? "bg-gradient-to-r from-cyan-400 to-blue-500"
                    : "bg-gray-700"
                }`}
              ></div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {formStep === 1 && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-5"
            >
              <motion.div variants={itemVariants} className="relative">
                <Bookmark className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Title of your time capsule"
                  value={form.title}
                  name="title"
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-10 rounded-lg text-sm bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none border border-gray-700 transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Your name"
                  value={form.sentBy}
                  name="sentBy"
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-10  rounded-lg bg-gray-800 text-white text-sm placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none border border-gray-700 transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Recipient's name"
                  value={form.recipientsName}
                  name="recipientsName"
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-10 rounded-lg text-sm bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none border border-gray-700 transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 w-5 h-5" />
                <input
                  type="email"
                  placeholder="Recipient's Email"
                  value={form.recipientsEmail}
                  name="recipientsEmail"
                  onChange={handleChange}
                  required
                  className="w-full p-3 pl-10 rounded-lg text-sm bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none border border-gray-700 transition-all duration-300"
                />
              </motion.div>

              <motion.div variants={itemVariants} className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-400 w-5 h-5" />
                <input
                  type="date"
                  value={form.unlockDate}
                  name="unlockDate"
                  onChange={handleChange}
                  onFocus={() => setDateInputFocused(true)}
                  onBlur={() => setDateInputFocused(false)}
                  required
                  className={`w-full p-3 pl-10 rounded-lg bg-gray-800 text-white focus:ring-2 focus:ring-cyan-400 focus:outline-none border border-gray-700 transition-all duration-300 
                    ${
                      !dateInputFocused && !form.unlockDate
                        ? "text-gray-400"
                        : "text-white"
                    }`}
                  placeholder="Select unlock date"
                />
                {!dateInputFocused && !form.unlockDate && (
                  <span className="absolute left-10 text-sm md:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                    Select unlock date
                  </span>
                )}
              </motion.div>

              <motion.div variants={itemVariants} className="pt-4">
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:from-cyan-600 hover:to-blue-700 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue <Send size={18} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          {formStep === 2 && (
            <motion.div
              variants={formVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="space-y-5"
            >
              <motion.div variants={itemVariants}>
                <label className="block text-gray-300 mb-2 text-sm">
                  Message
                </label>
                <textarea
                  placeholder="Write your message to the future..."
                  value={form.message}
                  name="message"
                  onChange={handleChange}
                  required
                  className="w-full p-4 rounded-lg text-sm bg-gray-800 text-white placeholder-gray-400 h-48 focus:ring-2 focus:ring-cyan-400 focus:outline-none border border-gray-700 transition-all duration-300"
                ></textarea>
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="relative group border-2 border-dashed border-gray-700 hover:border-cyan-500/50 p-6 rounded-xl text-center transition-all duration-300"
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="sr-only"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center justify-center text-gray-400 group-hover:text-cyan-400 transition duration-300"
                >
                  <Camera size={32} className="mb-2" />
                  <span className="text-sm">Upload Images</span>
                  <span className="text-xs text-gray-500 mt-1">
                    Click or drag files here
                  </span>
                </label>
              </motion.div>

              {images.length > 0 && (
                <motion.div
                  variants={itemVariants}
                  className="flex flex-wrap gap-3 mt-3"
                >
                  {images.map((img, index) => (
                    <div key={index} className="relative w-24 h-24 group">
                      <motion.img
                        src={img}
                        alt="preview"
                        className="w-full h-full object-cover rounded-lg border border-gray-700 group-hover:border-cyan-500/50 transition-all duration-300"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full text-xs shadow-lg opacity-80 hover:opacity-100 transition-opacity duration-200"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <X size={14} />
                      </motion.button>
                    </div>
                  ))}
                </motion.div>
              )}

              <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="flex-1 border border-gray-600 text-gray-300 font-medium px-6 py-3 rounded-lg hover:bg-gray-800 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  Back
                </motion.button>

                <motion.button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg flex items-center justify-center gap-2 hover:from-purple-600 hover:to-cyan-600 transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    <>
                      <Gift size={18} />
                      Save
                    </>
                  )}
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </form>

        <motion.div
          className="mt-8 text-center text-sm text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          Your capsule will be securely stored until the unlock date
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CreateCapsule;
