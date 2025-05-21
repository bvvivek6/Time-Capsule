import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar";
import CreateCapsule from "./Createcapsule";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Dashboard = () => {
  const location = useLocation();
  const defaultTab = location.state?.defaultTab || "received";
  const [selectedCapsule, setSelectedCapsule] = useState(null);
  const [activeTab, setActiveTab] = useState(defaultTab);

  const addNewSentCapsule = (newCapsule) => {
    setSentCapsules((prevCapsules) => [newCapsule, ...prevCapsules]);
    setActiveTab("sent");
  };

  const [sentCapsules, setSentCapsules] = useState([]);
  const [receivedCapsules, setReceivedCapsules] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [capsuleToDelete, setCapsuleToDelete] = useState(null);

  useEffect(() => {
    const fetchCapsules = async () => {
      const token = localStorage.getItem("token");

      try {
        const baseUrl = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${baseUrl}/capsules`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setSentCapsules(response.data.sent);
        setReceivedCapsules(response.data.received);
      } catch (err) {
        console.error("Error fetching capsules:", err);
      }
    };

    fetchCapsules();
  }, []);

  const currentDate = new Date().toISOString().split("T")[0];

  const handleDelete = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const baseUrl = import.meta.env.VITE_API_URL;
      await axios.delete(`${baseUrl}/capsules/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSentCapsules((prevCapsules) =>
        prevCapsules.filter((capsule) => capsule._id !== id)
      );
      toast.success("Capsule deleted successfully");
    } catch (err) {
      toast.error("Error deleting capsule");
      console.error("Error deleting capsule:", err);
    }
  };

  const confirmDelete = (capsule) => {
    setCapsuleToDelete(capsule);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    if (capsuleToDelete) {
      handleDelete(capsuleToDelete._id);
    }
    setShowDeleteModal(false);
    setCapsuleToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setCapsuleToDelete(null);
  };

  const capsulesToShow =
    activeTab === "received" ? receivedCapsules : sentCapsules;

  return (
    <div className="bg-black">
      <Navbar />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <section className="min-h-screen bg-gradient-to-b from-gray-900 to-black py-32 px-4 sm:px-6 lg:px-8 font-mono">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl tracking-tighter sm:text-5xl font-bold text-center bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-8">
              My Capsules_
            </h1>

            <div className="flex justify-center mb-8 ">
              <div className="inline-flex bg-gray-800 rounded-full  shadow-lg">
                <button
                  onClick={() => setActiveTab("received")}
                  className={`px-3 py-1 rounded-full transition-all duration-300 ${
                    activeTab === "received"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📥</span>
                    <span>Received</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("sent")}
                  className={`px-3 py-2 rounded-full transition-all duration-300 ${
                    activeTab === "sent"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">📤</span>
                    <span>Sent</span>
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab("create")}
                  className={`px-6 py-3 rounded-full transition-all duration-300 ${
                    activeTab === "create"
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-md"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className="text-lg">✨</span>
                    <span>Create</span>
                  </span>
                </button>
              </div>
            </div>

            {activeTab === "create" ? (
              <div className="rounded-xl shadow-xl backdrop-blur-sm">
                <CreateCapsule onCreate={addNewSentCapsule} />
              </div>
            ) : capsulesToShow.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {capsulesToShow.map((capsule) => {
                  const isUnlocked = capsule.unlockDate <= currentDate;

                  return (
                    <motion.div
                      key={capsule.id}
                      className="relative overflow-hidden rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                      }}
                    >
                      <div className="p-5 border-b border-gray-700">
                        <div className="flex justify-between items-start">
                          <h2 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent tracking-tighter">
                            {capsule.title}
                          </h2>
                          {activeTab === "sent" && (
                            <button
                              className="ml-2 flex-shrink-0 opacity-70 hover:opacity-100 text-red-400 hover:text-red-500 transition-all p-1 rounded-full hover:bg-gray-700"
                              onClick={() => confirmDelete(capsule)}
                              title="Delete Capsule"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="currentColor"
                                viewBox="0 0 16 16"
                              >
                                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                                <path
                                  fillRule="evenodd"
                                  d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                                />
                              </svg>
                            </button>
                          )}
                        </div>
                      </div>

                      <div className="px-5 py-4">
                        <p className="text-sm text-gray-300 mb-2">
                          {activeTab === "received" ? (
                            <span className="flex items-center gap-1">
                              <span className="text-xs text-gray-400">
                                From:
                              </span>
                              <span className="font-medium text-white">
                                {capsule.sentBy}
                              </span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <span className="text-xs text-gray-400">To:</span>
                              <span className="font-medium text-white">
                                {capsule.recipientsName}
                              </span>
                            </span>
                          )}
                        </p>
                        <div className="inline-flex items-center px-3 py-1 mt-1 mb-3 rounded-full text-xs font-medium bg-gray-700 bg-opacity-50">
                          {isUnlocked ? (
                            <span className="flex items-center text-green-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 11V7a4 4 0 118 0m-4 8v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2z"
                                />
                              </svg>
                              Unlocked
                            </span>
                          ) : (
                            <span className="flex items-center text-yellow-400">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-3.5 w-3.5 mr-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                />
                              </svg>
                              Unlocks{" "}
                              {new Date(capsule.unlockDate).toLocaleDateString(
                                "en-GB"
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="px-5 pb-5 pt-2">
                        {(activeTab === "sent" || isUnlocked) && (
                          <button
                            className="w-full py-2.5 rounded-lg flex justify-center items-center gap-2 font-medium transition-all bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white shadow-md"
                            onClick={() => setSelectedCapsule(capsule)}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                              />
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                              />
                            </svg>
                            View Capsule
                          </button>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-400">
                <div className="text-6xl mb-4">📭</div>
                <h3 className="text-xl font-semibold text-gray-300 mb-2">
                  No capsules found
                </h3>
                <p>
                  {activeTab === "received"
                    ? "You haven't received any time capsules yet"
                    : "You haven't created any time capsules yet"}
                </p>
              </div>
            )}
          </div>

          <AnimatePresence>
            {selectedCapsule && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm px-4 sm:px-6 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <motion.div
                  className="bg-gray-900 rounded-xl overflow-hidden w-full max-w-2xl text-white relative shadow-2xl border border-gray-700"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                >
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-cyan-400">
                      {selectedCapsule.title}
                    </h2>
                    <button
                      className="text-gray-400 hover:text-white transition-colors"
                      onClick={() => setSelectedCapsule(null)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="p-6">
                    <div className="bg-gray-800 bg-opacity-50 rounded-lg p-4 mb-6">
                      <p className="text-gray-300">{selectedCapsule.message}</p>
                    </div>

                    {selectedCapsule.mediaFiles &&
                      selectedCapsule.mediaFiles.length > 0 && (
                        <div className="mt-6">
                          <h3 className="text-lg font-semibold text-gray-200 mb-3">
                            Attachments
                          </h3>
                          <div className="max-h-80 overflow-y-auto pr-2 scrollbar-thin">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {selectedCapsule.mediaFiles.map(
                                (imgSrc, index) => (
                                  <div
                                    key={index}
                                    className="relative group overflow-hidden rounded-lg shadow-md"
                                  >
                                    <img
                                      src={imgSrc.url}
                                      alt={`Capsule image ${index + 1}`}
                                      className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-3">
                                      <span className="text-white text-xs">
                                        Item {index + 1}
                                      </span>
                                      <a
                                        href={imgSrc}
                                        download={`capsule-image-${
                                          index + 1
                                        }.jpg`}
                                        className="bg-cyan-500 hover:bg-cyan-600 text-white text-xs px-3 py-1 rounded shadow transition-colors"
                                      >
                                        Download
                                      </a>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                  </div>
                  <div className="bg-gray-800 px-6 py-4 flex justify-end">
                    <button
                      onClick={() => setSelectedCapsule(null)}
                      className="px-4 py-2 text-sm font-medium text-white bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          <AnimatePresence>
            {showDeleteModal && (
              <motion.div
                className="fixed inset-0 flex items-center justify-center bg-black/40 z-50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-gray-900 rounded-xl p-8 shadow-2xl border border-gray-700 max-w-md w-full">
                  <h2 className="text-xl font-bold text-red-400 mb-4">
                    Delete Capsule?
                  </h2>
                  <p className="text-gray-200 mb-6">
                    Deleting this capsule will also delete it for the receiver.
                    Are you sure you want to continue?
                  </p>
                  <div className="flex justify-end gap-3">
                    <button
                      className="px-4 py-2 rounded bg-gray-700 text-gray-200 hover:bg-gray-600"
                      onClick={handleDeleteCancel}
                    >
                      No
                    </button>
                    <button
                      className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
                      onClick={handleDeleteConfirm}
                    >
                      Yes, Delete
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      </motion.div>
    </div>
  );
};

export default Dashboard;
