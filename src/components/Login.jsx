import { useState } from "react";

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 font-mono">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-2xl w-full max-w-md text-white">
        <h1 className="text-3xl font-bold text-center mb-6">⏳ Time Capsule</h1>
        <h2 className="text-xl text-center mb-4">
          {isLogin ? "Login to your vault" : "Create a new capsule"}
        </h2>

        <form className="space-y-4">
          {!isLogin && (
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-xl bg-white/10 placeholder-white/60 focus:outline-none"
            />
          )}
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-xl bg-white/10 placeholder-white/60 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-xl bg-white/10 placeholder-white/60 focus:outline-none"
          />

          <button
            type="submit"
            className="w-full py-3 mt-4 bg-purple-700 hover:bg-purple-800 transition rounded-xl font-semibold"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center my-4">OR</div>

        <button className="w-full flex items-center justify-center space-x-2 py-3  transition rounded-xl font-semibold">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png"
            alt="Google"
            className="w-5 h-5"
          />
          <span>Continue with Google</span>
        </button>

        <p className="text-center text-sm mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            className="text-purple-300 underline hover:text-purple-100"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
}
