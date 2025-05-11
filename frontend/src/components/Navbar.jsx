import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { User, Clock, LogOut, ChevronDown, LogIn } from "lucide-react";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const profileRef = useRef(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      setIsAuthenticated(true);
      setUser(JSON.parse(userData));
    } else {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const handleLogout = () => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setIsAuthenticated(false);
      setUser(null);
      setShowProfileMenu(false);
      navigate("/");
      toast.success("Logged Out Successfully!");
    } catch (err) {
      toast.error("Error Logging Out!");
      console.error("Logout error:", err);
    }
  };

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [profileRef]);

  const navbarVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const menuVariants = {
    closed: { opacity: 0, x: 20, height: 0 },
    open: { opacity: 1, x: 0, height: "auto" },
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -5, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className="w-full fixed top-0 px-4 py-2 transition-all duration-300 backdrop-blur-xl z-50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="relative w-8 h-8">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-70"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <Clock size={16} className="text-white" />
            </div>
          </div>
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">
            TimeCapsule
          </span>
        </Link>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="hidden md:block px-4 py-2 text-sm bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-white border border-cyan-500/40 rounded-full hover:from-cyan-500/30 hover:to-blue-500/30 transition-colors"
              >
                Dashboard
              </Link>

              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 px-3 py-2 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User size={16} className="text-white" />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-white transition-transform duration-300 ${
                      showProfileMenu ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <motion.div
                  initial="hidden"
                  animate={showProfileMenu ? "visible" : "hidden"}
                  variants={dropdownVariants}
                  className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-xl shadow-xl border border-gray-700 z-50"
                >
                  <div className="px-4 py-2 border-b border-gray-700">
                    <p className="text-sm font-medium text-white">
                      {user?.name || "User"}
                    </p>
                    <p className="text-xs text-gray-400">{user?.email || ""}</p>
                  </div>

                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 hover:text-cyan-400"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    <Clock size={16} />
                    My Capsules
                  </Link>

                  <div className="border-t border-gray-700 mt-1"></div>
                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                  >
                    <LogOut size={16} />
                    Sign Out
                  </button>
                </motion.div>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 px-4 py-2 text-sm bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-full hover:from-cyan-600 hover:to-blue-600 transition-colors"
            >
              <LogIn size={16} />
              Sign In/Login
            </Link>
          )}
        </div>
      </div>

      <motion.div
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.2 }}
        className="md:hidden overflow-hidden"
      >
        <div className="bg-gray-900/95 backdrop-blur-md shadow-lg border-t border-gray-800 mt-2 rounded-lg">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="block px-4 py-3 text-gray-300 hover:text-cyan-400"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <div className="border-t border-gray-700"></div>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
              >
                <LogOut size={16} />
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="block px-4 py-3 text-cyan-400 hover:text-cyan-300"
              onClick={() => setIsOpen(false)}
            >
              Sign In / Sign Up
            </Link>
          )}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
