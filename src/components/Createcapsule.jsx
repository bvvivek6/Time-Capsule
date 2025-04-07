import React, { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const CreateCapsule = ({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [mname, setMyName] = useState("");
  const [rname, setReName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState(false);
  const [unlockDate, setUnlockDate] = useState("");
  const [message, setMessage] = useState("");
  const [images, setImages] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImages((prevImages) => [...prevImages, ...imageUrls]);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const newCapsule = {
      title,
      id: Date.now(),
      mname,
      to: rname,
      unlockDate,
      message,
      images,
    };

    onCreate(newCapsule);

    setTitle("");
    setMyName("");
    setEmail("");
    setUnlockDate("");
    setMessage("");
    setImages([]);
  };
  return (
    <>
      <div className=" flex justify-center font-mono items-center bg-black text-white">
        <motion.div
          className="bg-gray-900 p-6 rounded-xl shadow-lg max-w-lg w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Your name"
              value={mname}
              onChange={(e) => setMyName(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Recipient's name"
              value={rname}
              onChange={(e) => setReName(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />
            <input
              type="email"
              placeholder="Recipient's Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            />

            <div className="relative w-full">
              {!date && (
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                  dd-mm-yy
                </span>
              )}
              <input
                type="date"
                value={unlockDate}
                onChange={(e) => {
                  setUnlockDate(e.target.value);
                  setDate(!e.target.value);
                }}
                required
                className="w-full p-4 rounded-lg bg-gray-800 text-white  focus:ring-2 focus:ring-cyan-400 focus:outline-none sm:text-lg md:text-base appearance-none cursor-pointer min-w-[250px] placeholder-transparent"
              />
            </div>

            <textarea
              placeholder="Write your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 h-32 focus:ring-2 focus:ring-cyan-400 focus:outline-none"
            ></textarea>

            <div className="border-2 border-dashed border-gray-600 p-4 rounded-4xl text-center">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-gray-300 hover:text-cyan-400 transition duration-200"
              >
                📸 Upload Images
              </label>
            </div>
            <div className="flex flex-wrap gap-3 mt-3">
              {images.map((img, index) => (
                <div key={index} className="relative w-20 h-20">
                  <motion.img
                    src={img}
                    alt="preview"
                    className="w-full h-full object-cover rounded-lg"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.button
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-600 text-white p-1 rounded-full text-xs shadow-lg"
                  >
                    ✖
                  </motion.button>
                </div>
              ))}
            </div>
            <motion.button
              type="submit"
              className="w-full cursor-pointer bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
              whileHover={{ scale: 1.0 }}
            >
              Save Capsule 🧧
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  );
};

export default CreateCapsule;
