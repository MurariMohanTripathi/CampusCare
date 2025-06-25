import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase"; // Adjust path to your firebase file
import { X } from "lucide-react";

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleReset = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." });
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage({ type: "success", text: "Password reset email sent successfully." });
      setEmail("");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="bg-black/30 bg-opacity-50 backdrop-blur-sm fixed inset-0 z-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 transition"
        >
          <X size={20} />
        </button>

        <h2 className="text-xl font-semibold text-center mb-4">Forgot Password</h2>

        <form onSubmit={handleReset}>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            className="w-full px-3 py-2 border rounded-md mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Enter your registered email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Send Reset Link
          </button>
        </form>

        {message.text && (
          <p className={`mt-4 text-sm ${message.type === "error" ? "text-red-500" : "text-green-600"}`}>
            {message.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
