import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import CreateCapsule from "../components/Createcapsule";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const defaultTab = location.state?.defaultTab || "received";
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [activeTab, setActiveTab] = useState(defaultTab);

  const addNewSentCapsule = (newCapsule) => {
    setSentCapsules((prevCapsules) => [newCapsule, ...prevCapsules]);
    setActiveTab("sent");
  };

  const [sentCapsules, setSentCapsules] = useState([
    {
      id: 101,
      title: "Message to Mom",
      to: "Vivek",
      unlockDate: "2025-05-10",
      message: "Wrote this letter for my mom's birthday.",
      images: ["https://via.placeholder.com"],
    },
    {
      id: 102,
      title: "Old Music Video",
      to: "Arjun",
      unlockDate: "2024-04-15",
      message: "Something I recorded years ago!",
      images: ["https://www.w3schools.com/html/mov_bbb.mp4"],
    },
  ]);

  const receivedCapsules = [
    {
      id: 1,
      title: "Letter to Future Me",
      from: "Myself",
      unlockDate: "2025-12-01",
      message: "Dear future me, I hope you're doing amazing...",
      images: [],
    },
    {
      id: 2,
      from: "My Best Friend",
      title: "Graduation Video",
      unlockDate: "2024-06-15",
      message: "A heartfelt video message from my graduation day!",
      images: ["https://www.w3schools.com/html/mov_bbb.mp4"],
    },
    {
      id: 3,
      from: "My Best Friend",
      title: "Family Memories",
      unlockDate: "2024-12-20",
      message: "Photos and videos from our unforgettable family trip.",
      images: ["https://www.istockphoto.com/"],
    },
  ];

  const currentDate = new Date().toISOString().split("T")[0];

  const handleDelete = (id) => {
    const updated = sentCapsules.filter((capsule) => capsule.id !== id);
    setSentCapsules(updated);
  };

  const capsulesToShow =
    activeTab === "received" ? receivedCapsules : sentCapsules;

  return (
    <>
      <Navbar />
      <section className="items-center h-full py-20 px-6 font-mono bg-black min-h-screen">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-cyan-400 mb-8">
          My Time Capsules
        </h1>

        {/* Toggle Tabs */}
        <div className="flex justify-center mb-10 gap-4">
          <button
            onClick={() => setActiveTab("received")}
            className={`px-4 py-2 cursor-pointer rounded-lg ${
              activeTab === "received"
                ? "bg-cyan-400 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            📥 Received
          </button>
          <button
            onClick={() => setActiveTab("sent")}
            className={`px-4 py-2 cursor-pointer rounded-lg ${
              activeTab === "sent"
                ? "bg-cyan-400 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            📤 Sent
          </button>
          <button
            onClick={() => setActiveTab("create")}
            className={`px-4 cursor-pointer py-2 rounded-lg ${
              activeTab === "create"
                ? "bg-cyan-400 text-black"
                : "bg-gray-800 text-white"
            }`}
          >
            Create Capsule +
          </button>
        </div>
        {activeTab === "create" ? (
          <CreateCapsule onCreate={addNewSentCapsule} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {capsulesToShow.map((capsule) => {
              const isUnlocked = capsule.unlockDate <= currentDate;

              return (
                <motion.div
                  key={capsule.id}
                  className="p-5 rounded-2xl relative bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg border border-gray-700 hover:shadow-2xl hover:scale-[1.015] transition-all duration-300 text-white"
                  initial={{ opacity: 0, scale: 1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: isUnlocked ? 0.6 : 0,
                    ease: "easeOut",
                  }}
                >
                  {activeTab === "sent" && (
                    <button
                      className="absolute -right-2 -top-2 cursor-pointer bg-red-500 hover:bg-red-600 pr-2 pl-2 text-white rounded-full shadow-md transition"
                      onClick={() => handleDelete(capsule.id)}
                      title="Delete Capsule"
                    >
                      X
                    </button>
                  )}

                  <h2 className="text-2xl font-bold mb-2 text-cyan-300">
                    {capsule.title}
                  </h2>

                  <p className="text-sm text-gray-400 mb-1">
                    {activeTab === "received"
                      ? `From: ${capsule.from}`
                      : `To: ${capsule.to}`}
                  </p>

                  <p className="mt-3 text-sm italic text-yellow-300">
                    🔒 {isUnlocked ? "Unlocked" : "Unlocks"} on{" "}
                    {capsule.unlockDate}
                  </p>

                  {activeTab === "sent" || isUnlocked ? (
                    <button
                      className="cursor-pointer flex justify-center items-center mt-5 bg-cyan-400 hover:bg-cyan-300 text-black px-3 py-2 w-full rounded-xl font-semibold transition-all text-sm shadow-md"
                      onClick={() => setSelectedCapsule(capsule)}
                    >
                      {activeTab === "sent" ? "View" : "View Capsule 👀"}
                    </button>
                  ) : (
                    ""
                  )}
                </motion.div>
              );
            })}
          </div>
        )}

        <AnimatePresence>
          {selectedCapsule && (
            <motion.div
              className="fixed inset-0 flex items-center justify-center  bg-opacity-70 backdrop-blur-md px-4 sm:px-6 z-50"
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
                <h2 className="text-2xl font-bold mb-3">
                  {selectedCapsule.title}
                </h2>
                <p className="text-gray-300 text-sm mb-4">
                  {selectedCapsule.message}
                </p>

                {selectedCapsule.images &&
                  selectedCapsule.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mt-4">
                      {selectedCapsule.images.map((imgSrc, index) => (
                        <img
                          key={index}
                          src={imgSrc}
                          alt={`Capsule image ${index + 1}`}
                          className="w-full h-36 object-cover rounded-lg"
                        />
                      ))}
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
