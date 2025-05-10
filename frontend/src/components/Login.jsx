import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
  const navigate = useNavigate();

  // Check if already logged in
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const endpoint = isLogin ? "/login" : "/signup";
      console.log(`Sending request to ${api.defaults.baseURL}${endpoint}`);

      const requestData = isLogin
        ? { email: formData.email, password: formData.password }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      console.log("Request payload:", JSON.stringify(requestData, null, 2));

      const response = await api.post(endpoint, requestData, {
        timeout: 10000, // 10 second timeout
      });

      console.log("Auth response:", response.data);

      // Save token and user data
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      // Set auth header for future requests
      api.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${response.data.token}`;

      navigate("/dashboard");
    } catch (err) {
      console.error("Auth error details:", err);

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
      <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-xl text-center shadow-2xl w-full max-w-md text-white font-mono">
        <a
          href="/"
          className="text-3xl font-extrabold tracking-tight text-cyan-400"
        >
          ⏳ Time Capsule
        </a>
        <h2 className="text-lg sm:text-xl text-center mb-6 text-gray-200">
          {isLogin ? "Login to your vault 💼" : "Create a new capsule"}
        </h2>

        {error && (
          <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required={!isLogin}
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          )}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-2 bg-blue-400 hover:bg-blue-500 transition rounded-xl font-semibold shadow-md disabled:opacity-50"
          >
            {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
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
  );
}
