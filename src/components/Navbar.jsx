import React from "react";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 left-0 w-full backdrop-blur-2xl bg-opacity-80 font-mono shadow-md py-4 px-6 flex justify-between items-center z-50">
      <a href="/" className="text-sm font-bold text-cyan-400">
        TimeCapsule
      </a>

      <div className="md:hidden">
        {isOpen ? (
          <FiX
            className="text-gray-300 text-2xl cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        ) : (
          <FiMenu
            className="text-gray-300 text-2xl cursor-pointer"
            onClick={() => setIsOpen(true)}
          />
        )}
      </div>

      <div className="hidden md:flex items-center gap-6">
        <a
          href="/dashboard"
          className="text-gray-300 hover:text-cyan-400 transition"
        >
          My Dashboard
        </a>
        <a
          href="/login"
          className="bg-gradient-to-r from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-semibold px-4 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
        >
          Sign Up/ Login
        </a>
      </div>

      {isOpen && (
        <div
          className="absolute top-16 right-6 w-[50vw] bg-gray-700 backdrop-blur-2xl p-3.5 rounded-2xl
         flex flex-col items-center space-y-3 py-6 md:hidden"
        >
          <a
            href="/dashboard"
            className="text-gray-950 font-semibold w-full hover:text-cyan-400 transition text-lg p-3 rounded-4xl bg-cyan-400 flex  tracking-tighter justify-center"
            onClick={() => setIsOpen(false)}
          >
            My Dashboard
          </a>
          <a
            href="/login"
            className="bg-gradient-to-r w-full flex justify-center from-purple-500 to-cyan-400 hover:from-purple-600 hover:to-cyan-500 text-white font-semibold px-6 py-3 rounded-4xl transition-transform transform hover:scale-105"
            onClick={() => setIsOpen(false)}
          >
            Sign Up/ Login
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
