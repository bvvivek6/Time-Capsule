import React from "react";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 font-DM font-mono ">
      <Navbar />
      <section className="flex flex-col items-center h-[90vh] justify-center text-center py-20 px-6 bg-black">
        <motion.h1
          className="text-5xl font-bold text-cyan-400 mb-4 tracking-tighter"
          initial={{ filter: "blur(10px)", opacity: 0, y: 20 }}
          animate={{ filter: "blur(0px)", opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          Unlock the Past, Relive the Future
        </motion.h1>
        <motion.p
          className="text-lg text-white mb-6 max-w-xl tracking-tighter"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
        >
          Store your messages, photos, and videos in a secure time capsule to be
          opened in the future.
        </motion.p>

        <motion.a
          href="/createcapsule"
          className="absolute bg-gradient-to-r rounded-xl bottom-30 lg:bottom-60 tracking-tighter from-cyan-400 to-purple-500 hover:from-cyan-500 hover:to-purple-600 text-white font-semibold px-6 py-3 shadow-lg transition-transform transform"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Create Your Capsule!🧧
        </motion.a>
      </section>
      <section className="py-16 px-6 bg-black">
        <h2 className="text-4xl text-center font-bold text-blue-400 mb-10 tracking-tighter">
          So... how does it work?
        </h2>
        <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto text-center">
          <div className="p-6 bg-gray-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-cyan-400 mb-2 tracking-tighter">
              1. Create a Time Capsule
            </h3>
            <p className="text-gray-300">
              Add messages, photos, or videos to your digital capsule.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-purple-400 mb-2 tracking-tighter">
              2. Set a Future Date
            </h3>
            <p className="text-gray-300 tracking-tighter">
              Choose when your capsule will be unlocked.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-400 mb-2">
              3. Share or Keep Private
            </h3>
            <p className="text-gray-300 tracking-tighter">
              Send it to yourself or surprise a loved one💌
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-black">
        <h2 className="text-4xl font-semibold text-center text-cyan-400 mb-10 tracking-tighter">
          Why time capsule??
        </h2>
        <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4  text-blue-400">
              🛡️ Secure & Encrypted
            </h3>
            <p className="text-gray-300 lg:text-left sm:text-center">
              Your data is safely stored and accessible only when the time is
              right.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-purple-400">
              🎭 Preserve Your Legacy
            </h3>
            <p className="text-gray-300">
              Leave behind memories for your future self or loved ones.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-cyan-400">
              📩 Scheduled Delivery
            </h3>
            <p className="text-gray-300 ">
              Set up automatic email notifications for future capsule opening.
            </p>
          </div>
          <div className="p-6 bg-gray-900 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4 text-blue-400">
              🔓 Open Only When Ready and Count down ends!⏱️
            </h3>
            <p className="text-gray-300">
              Your capsules remain locked until the chosen date.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
