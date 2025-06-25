import React, { useState } from "react";
import { AiTwotoneMail } from "react-icons/ai";
import { TbLockPassword } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signInWithEmailAndPassword } from "firebase/auth";
import { ref, get } from "firebase/database";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import ForgotPasswordModal from "../component/ForgotPasswordModal";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = () => navigate("/SignUp");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // if (!user.emailVerified) {
      //   setError("Please verify your email before logging in.");
      //   return;
      // }

      const snapshot = await get(ref(db, "users/" + user.uid));
      if (snapshot.exists()) {
        const userType = snapshot.val().type;
        if (userType === "student") navigate("/Homepage");
        else if (userType === "SuperAdmin") navigate("/HomepageAdmin");
        else if (userType === "DepartmentAdmin") navigate("/DAdmin");
        else setError("Unknown user type");
      } else {
        setError("User data not found");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-100 via-cyan-100 to-blue-200 px-4 py-10">
      <div className="w-full max-w-4xl bg-white shadow-2xl rounded-3xl overflow-hidden flex flex-col md:flex-row">
        {/* Left Branding Section */}
        <div className="hidden md:flex w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex-col justify-center items-center p-8">
          <h1 className="text-4xl font-bold mb-4 tracking-tight">CampusCare</h1>
          <p className="text-lg text-center leading-relaxed max-w-xs">
            Secure portal for students and admins. Manage complaints,
            announcements, and more.
          </p>
          <img
            src="https://img.freepik.com/free-vector/mobile-login-concept-illustration_114360-135.jpg?w=740"
            alt="Login"
            className="w-full mt-6 max-w-xs rounded-xl shadow-xl"
          />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 sm:p-10 ">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-8">
            Login to Your Account
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400">
                <AiTwotoneMail className="text-xl text-gray-500 mr-2" />
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full outline-none text-gray-800"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400 relative">
                <TbLockPassword className="text-xl text-gray-500 mr-2" />
                <input
                  type={showPassword ? "text" : "password"} // 👈 dynamic type
                  placeholder="Enter password"
                  maxLength={128}
                  className="w-full outline-none text-gray-800 pr-8"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span
                  className="absolute right-3 text-xl text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)} // 👈 toggle
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-md transition transform hover:scale-105"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleSignUp}
                className="w-full border border-blue-600 text-blue-600 hover:bg-blue-50 font-semibold py-2.5 rounded-md transition"
              >
                Sign Up
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-center text-red-600 text-sm font-medium">
                {error}
              </p>
            )}
          </form>

          {/* Optional forgot password link */}
          <button
            onClick={() => setIsForgotOpen(true)}
            className="text-center text-sm text-blue-600 mt-4  hover:underline cursor-pointer "
          >
            Forgot Password?
          </button>
        </div>
      </div>
      <ForgotPasswordModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
      />
    </div>
  );
};

export default LoginPage;
