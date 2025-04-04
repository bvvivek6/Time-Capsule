import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiMenu } from "react-icons/fi";
import Navbar from "./Navbar";

const Dashboard = () => {
  const [selectedCapsule, setSelectedCapsule] = useState(null);

  const capsules = [
    {
      id: 1,
      title: "Letter to Future Me",
      from: "Myself",
      unlockDate: "2025-12-01",
      description: "Dear future me, I hope you're doing amazing...",
      media: null,
    },
    {
      id: 2,
      from: "My Best Friend",
      title: "Graduation Video",
      unlockDate: "2024-06-15",
      description: "A heartfelt video message from my graduation day!",
      media: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 3,
      from: "My Best Friend",
      title: "Family Memories",
      unlockDate: "2024-12-20",
      description: "Photos and videos from our unforgettable family trip.",
      media: "https://via.placeholder.com/400",
    },
  ];

  const currentDate = new Date().toISOString().split("T")[0];
  return (
    <>
      <Navbar />
      <section className="items-center h-[100vh] py-20 px-6 font-mono bg-black">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-cyan-400 mb-12">
          My Time Capsules
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {capsules.map((capsule) => {
            const isUnlocked = capsule.unlockDate <= currentDate;

            return (
              <motion.div
                key={capsule.id}
                className="p-4 sm:p-1 lg:p-6 rounded-2xl relative transition-all bg-gray-900 text-white"
                initial={{ opacity: 0, scale: isUnlocked ? 0.85 : 1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: isUnlocked ? 0.8 : 0, ease: "easeOut" }}
              >
                {isUnlocked && (
                  <div className="absolute -top-1 right-0 w-[20px] h-[20px] bg-yellow-500 rounded-full"></div>
                )}
                <h2 className="text-2xl sm:text-3xl mb-4 font-semibold tracking-tighter">
                  {capsule.title}
                </h2>
                <p className="text-base sm:text-xl text-gray-200">
                  From: {capsule.from}
                </p>
                <p className="text-sm sm:text-lg text-gray-400">
                  Unlock Date: {capsule.unlockDate}
                </p>

                {isUnlocked ? (
                  <button
                    className="cursor-pointer flex justify-center items-center mx-auto mt-10 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-2 w-[90%] rounded-2xl transition font-mono text-sm sm:text-base"
                    onClick={() => setSelectedCapsule(capsule)}
                  >
                    View Capsule 👀
                  </button>
                ) : (
                  <p className="mt-4 text-gray-500 italic text-sm sm:text-base">
                    🔒 Locked until {capsule.unlockDate}
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Modal for Viewing Capsule */}
        <AnimatePresence>
          {selectedCapsule && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center bg-opacity-60 backdrop-blur-md px-4 sm:px-6 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="bg-gray-900 p-4 sm:p-6 rounded-lg w-full max-w-md sm:max-w-lg text-white relative"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                <button
                  className="absolute top-2 right-2 text-gray-400 hover:text-white text-2xl"
                  onClick={() => setSelectedCapsule(null)}
                >
                  ✖
                </button>
                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                  {selectedCapsule.title}
                </h2>
                <p className="text-gray-300 text-sm sm:text-base">
                  {selectedCapsule.description}
                </p>

                {selectedCapsule.media && (
                  <div className="mt-4">
                    {selectedCapsule.media.includes(".mp4") ? (
                      <video controls className="w-full rounded-lg">
                        <source src={selectedCapsule.media} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    ) : (
                      <img
                        src={selectedCapsule.media}
                        alt="Capsule Media"
                        className="w-full rounded-lg"
                      />
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </>
  );
};

export default Dashboard;
