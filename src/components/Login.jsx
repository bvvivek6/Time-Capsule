import { useState } from "react";
import Navbar from "./Navbar";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="h-dvh flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 py-10 tracking-tighter">
      <div className="bg-white/10 backdrop-blur-xl p-8 sm:p-10 rounded-xl text-center shadow-2xl w-full max-w-md text-white font-mono ">
        <a
          href="/"
          className="text-3xl font-extrabold  tracking-tight text-cyan-400"
        >
          ⏳ Time Capsule
        </a>
        <h2 className="text-lg sm:text-xl text-center mb-6 text-gray-200">
          {isLogin ? "Login to your vault💼" : "Create a new capsule"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/10 placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          />

          <button
            type="submit"
            className="w-full py-3 mt-2 bg-blue-400 transition rounded-xl font-semibold shadow-md"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center my-4 text-gray-400">— OR —</div>

        <button className="w-full flex text-sm items-center justify-center space-x-2 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-medium text-white shadow-sm transition">
          <img
            src="https://www.gstatic.com/marketing-cms/assets/images/d5/dc/cfe9ce8b4425b410b49b7f2dd3f3/g.webp=s96-fcrop64=1,00000000ffffffff-rw"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-sm mt-6 text-gray-300">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-cyan-300 underline hover:text-cyan-200 transition"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
