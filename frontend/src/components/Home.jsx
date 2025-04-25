import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import { Clock, Lock, Shield, Mail, Gift } from "lucide-react";

const Home = () => {
  const navigate = useNavigate();
  const handleCreateClick = () => {
    navigate("/dashboard", { state: { defaultTab: "create" } });
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
    <div className="min-h-screen font-mono text-gray-100 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-cyan-500 rounded-full opacity-5 blur-3xl"></div>
        <div className="absolute -bottom-20 right-1/4 w-64 h-64 bg-purple-500 rounded-full opacity-5 blur-3xl"></div>
      </div>

      <Navbar />

      <section className="relative flex flex-col items-center min-h-screen justify-center text-center py-10 px-6 pt-4">
        <motion.div
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center"
        >
          {/* Animated time capsule icon */}
          <motion.div className="mb-8" variants={fadeIn} custom={0}>
            <div className="relative w-24 h-24 mx-auto mb-4">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full opacity-20 animate-pulse"></div>
              <div className="relative w-full h-full flex items-center justify-center">
                <Clock size={48} className="text-cyan-400" />
              </div>
            </div>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter"
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
            className="text-lg text-white mb-10 max-w-xl tracking-tighter"
            variants={fadeIn}
            custom={2}
          >
            Store your messages, photos, and videos in a secure time capsule to
            be opened in the future.
          </motion.p>

          <motion.button
            onClick={handleCreateClick}
            className="relative overflow-hidden group bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300"
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

          <motion.div
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
          >
            <div className="flex flex-col items-center gap-2">
              <span className="text-sm text-gray-200">
                Scroll to learn more
              </span>
              <div className="w-1 h-20 bg-gradient-to-b from-cyan-500 to-transparent rounded-full"></div>
            </div>
          </motion.div>
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
      <section className="py-20 px-6 text-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="relative max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tighter">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
              Ready to create your first time capsule?
            </span>
          </h2>
          <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
            Start preserving memories today for tomorrow's discovery.
          </p>
          <motion.button
            onClick={handleCreateClick}
            className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold px-8 py-4 rounded-xl shadow-lg transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Now
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default Home;
