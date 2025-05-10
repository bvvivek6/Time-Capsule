import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { Clock, Lock, Shield, Mail, Gift } from "lucide-react";
import { BoxesCore } from "./BoxCore";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000",
});

const Home = () => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { state: { defaultTab: "create" } });
    } else {
      navigate("/login");
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (custom) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut", delay: custom * 0.2 },
    }),
  };

  return (
    <div className="min-h-screen py-20 font-mono text-gray-100 bg-[#000000]  overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <Navbar />

      <section className="relative flex flex-col items-center min-h-[90vh] justify-center text-center  px-6 py-4">
        <BoxesCore />
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center z-20"
        >
          <motion.div className="mb-8" variants={fadeIn} custom={0}>
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <Clock size={48} className="text-cyan-400" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-3xl md:text-6xl font-bold mb-4 tracking-tighter"
            variants={fadeIn}
            custom={1}
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Unlock the Past,
            </span>
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
              Relive the Future
            </span>
          </motion.h1>

          <motion.p
            className="text-sm text-white mb-10 max-w-xl tracking-tighter"
            variants={fadeIn}
            custom={2}
          >
            Store your messages, photos, and videos in a secure time capsule to
            be opened in the future.
          </motion.p>

          <motion.button
            onClick={handleCreateClick}
            className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-full shadow-lg transition-all duration-300"
            variants={fadeIn}
            custom={3}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 transform -skew-x-12 group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
            <span className="flex items-center gap-2">
              Create Your Capsule <Gift size={20} />
            </span>
          </motion.button>
          <div className="mt-12 flex flex-col items-center gap-3">
            <motion.span
              className="text-xs tracking-wider text-cyan-400 uppercase"
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
            >
              Scroll to explore
            </motion.span>

            <motion.div
              initial={{ opacity: 0, scaleY: 0.5 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 2 }}
              className="relative w-1 h-28 rounded-full bg-gradient-to-b from-cyan-400 to-transparent shadow-[0_0_24px_rgba(34,211,238,0.8)]"
            >
              <motion.div
                className="absolute inset-0 rounded-full blur-xl bg-cyan-500 opacity-40 z-0"
                animate={{ opacity: [0, 0.8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "easeInOut",
                }}
              />

              <motion.div
                className="absolute top-0 left-0 w-full h-6 bg-cyan-400 rounded-full blur-xs z-10"
                initial={{ y: "100%" }}
                animate={{ y: "-50%", opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.4,
                  repeat: Infinity,
                  repeatType: "loop",
                  ease: "linear",
                }}
              />

              <motion.div className="absolute left-1/2 top-full w-4 h-4 -translate-x-1/2 -translate-y-1/2 border-2 border-cyan-400 rounded-full animate-ping z-20" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="absolute inset-0 opacity-50"></div>
        <div className="relative max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              So... how does it work?
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="relative p-6 bg-gray-900 bg-opacity-80 rounded-xl shadow-xl border border-gray-700 overflow-hidden group"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
              <div className="mb-6 p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-full w-16 h-16 flex items-center justify-center">
                <Gift size={32} className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-cyan-400 mb-4 tracking-tighter">
                1. Create a Time Capsule
              </h3>
              <p className="text-gray-200 text-sm">
                Add messages, photos, or videos to your digital capsule. Save
                memories that matter to you.
              </p>
            </motion.div>

            <motion.div
              className="relative p-6 bg-gray-900 bg-opacity-80 rounded-xl shadow-xl border border-gray-700 overflow-hidden group"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-purple-500"></div>
              <div className="mb-6 p-3 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-full w-16 h-16 flex items-center justify-center">
                <Clock size={32} className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-purple-400 mb-4 tracking-tighter">
                2. Set a Future Date
              </h3>
              <p className="text-gray-200 text-sm">
                Choose when your capsule will be unlocked. Days, months, or
                years into the future.
              </p>
            </motion.div>

            <motion.div
              className="relative p-6 bg-gray-900 bg-opacity-80 rounded-xl shadow-xl border border-gray-700 overflow-hidden group"
              whileHover={{
                y: -5,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.3)",
              }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
              <div className="mb-6 p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-full w-16 h-16 flex items-center justify-center">
                <Mail size={32} className="text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-blue-400 mb-4">
                3. Share or Keep Private
              </h3>
              <p className="text-gray-200 text-sm">
                Send it to yourself or surprise a loved one with a future
                message 💌
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Why TimeCapsule?
            </span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <motion.div
              className="p-6 bg-gray-900 bg-opacity-70 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500/30 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-full">
                  <Shield size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">
                    Secure & Encrypted
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Your data is safely stored and encrypted, accessible only
                    when the time is right. We prioritize your privacy above
                    all.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-gray-900 bg-opacity-70 rounded-xl shadow-xl border border-gray-700 hover:border-purple-500/30 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-500/5 rounded-full">
                  <Gift size={24} className="text-purple-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-purple-400">
                    Preserve Your Legacy
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Leave behind memories, advice, or messages for your future
                    self or loved ones. Create a digital legacy that lasts.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-gray-900 bg-opacity-70 rounded-xl shadow-xl border border-gray-700 hover:border-cyan-500/30 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-cyan-500/20 to-cyan-500/5 rounded-full">
                  <Mail size={24} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-cyan-400">
                    Scheduled Delivery
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Set up automatic email notifications for future capsule
                    opening. Never miss the moment when your time capsule
                    unlocks.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="p-6 bg-gray-900 bg-opacity-70 rounded-xl shadow-xl border border-gray-700 hover:border-blue-500/30 transition-colors duration-300"
              whileHover={{ y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-500/5 rounded-full">
                  <Lock size={24} className="text-blue-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4 text-blue-400">
                    Open Only When Ready
                  </h3>
                  <p className="text-gray-200 text-sm">
                    Your capsules remain locked until the chosen date. Watch the
                    countdown timer as you anticipate the moment of revelation
                    ⏱️
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
      <section className="py-2 px-6 flex flex-col text-center items-center relative">
        <div className="relative  max-w-4xl mx-auto">
          <p className="text-sm text-[#4e6cbe] tracking-tighter w-[50vw] my-3">
            © {new Date().getFullYear()} TimeCapsule. All rights reserved.
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
