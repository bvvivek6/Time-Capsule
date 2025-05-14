import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [animating, setAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setAnimating(true);
    setTimeout(() => {
      setShowPassword(!showPassword);
      setTimeout(() => {
        setAnimating(false);
      }, 300);
    }, 150);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Password validation
    if (!isLogin && formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? "/auth/login" : "/auth/signup";
      const requestData = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const response = await api.post(endpoint, requestData, {
        timeout: 10000,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;
      toast.success(
        isLogin ? "Logged in Successfully!" : "Account created successfully!"
      );

      // Clear form data after successful submission
      setFormData({ name: "", email: "", password: "" });
      navigate("/dashboard");
    } catch (err) {
      console.error("Auth error:", err);

      if (err.code === "ECONNABORTED") {
        setError(
          "Request timed out. Please check your connection and try again."
        );
      } else if (err.response) {
        setError(
          err.response.data?.message || `Server error: ${err.response.status}`
        );
      } else if (err.request) {
        setError(
          "No response from server. Please check if the backend is running."
        );
      } else {
        setError(`Request error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-dvh flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 py-10 tracking-tighter">
      <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-xl text-center shadow-2xl w-full max-w-md text-white font-mono relative overflow-hidden before:content-[''] before:absolute before:inset-0 before:bg-gradient-to-r before:from-cyan-500/10 before:via-blue-500/5 before:to-purple-500/10 before:opacity-50 before:animate-pulse">
        <div className="relative z-10">
          <a
            href="/"
            className="text-3xl font-extrabold tracking-tight text-cyan-400 inline-block hover:text-cyan-300 transition-colors duration-300 group"
          >
            <span className="inline-block transform transition-transform duration-300 group-hover:scale-110">
              ⏳
            </span>{" "}
            Time Capsule
          </a>
          <h2 className="text-lg sm:text-xl text-center mb-6 text-gray-200">
            {isLogin ? "Login to your vault 💼" : "Create your account ✨"}
          </h2>

          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-lg mb-4 text-sm animate-fadeIn">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            {!isLogin && (
              <div className="transform transition-all duration-300 hover:translate-y-px">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required={!isLogin}
                  className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent focus:border-cyan-400/30 transition-all duration-300"
                />
              </div>
            )}
            <div className="transform transition-all duration-300 hover:translate-y-px">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 border border-transparent focus:border-cyan-400/30 transition-all duration-300"
              />
            </div>
            <div className="relative transform transition-all duration-300 hover:translate-y-px group">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                minLength={6}
                className={`w-full p-3 rounded-lg bg-white/10 backdrop-blur-sm placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300 border border-transparent focus:border-cyan-400/30 ${
                  animating ? "blur-sm" : ""
                }`}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm group"
                aria-label={showPassword ? "Hide password" : "Show password"}
                disabled={animating}
              >
                <div
                  className={`relative w-6 h-6 transition-all duration-300 transform hover:scale-110 ${
                    animating ? "rotate-180" : ""
                  }`}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-cyan-300 transition-all duration-300 hover:text-cyan-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{
                        animation: "pulse 2s infinite",
                        filter: "drop-shadow(0 0 3px rgba(103, 232, 249, 0.6))",
                      }}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-cyan-300 transition-all duration-300 hover:text-cyan-200"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      style={{
                        animation: "pulse 2.5s infinite",
                        filter: "drop-shadow(0 0 3px rgba(103, 232, 249, 0.4))",
                      }}
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
                  )}
                </div>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 mt-2 bg-blue-400 hover:bg-blue-500 transition-all duration-300 rounded-xl font-semibold shadow-md disabled:opacity-50 relative overflow-hidden group"
            >
              <span className="relative z-10">
                {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
              <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-70 blur-lg transition-opacity duration-300"></span>
            </button>
          </form>

          <p className="text-center text-sm mt-6 text-gray-300">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="text-cyan-300 underline cursor-pointer hover:text-cyan-200 transition"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
                setFormData({ name: "", email: "", password: "" });
              }}
            >
              {isLogin ? "Sign up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
