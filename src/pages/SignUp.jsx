import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import {
  AiOutlineMail,
  AiOutlinePhone,
} from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdSchool } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    userType: "student",
    college_name: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const { email, password, phone, userType, college_name } = formData;
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await set(ref(db, "users/" + user.uid), {
        email,
        phone,
        type: userType,
        college_name,
      });

      alert("User registered successfully!");
      setTimeout(() => {
        if (userType === "student") navigate("/Homepage");
        else navigate("/HomepageAdmin");
      }, 500);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#8cbed1] via-[#3866e2] to-[#ad7261]">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-10 sm:p-12 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-[#3b0764] mb-8 drop-shadow-md">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          {/* Email */}
          <InputField
            label="Email"
            name="email"
            icon={<AiOutlineMail />}
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="you@example.com"
          />

          {/* Password */}
          <InputField
            label="Password"
            name="password"
            icon={<RiLockPasswordLine />}
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Create a password"
          />

          {/* Phone */}
          <InputField
            label="Phone Number"
            name="phone"
            icon={<AiOutlinePhone />}
            value={formData.phone}
            onChange={handleChange}
            type="text"
            placeholder="Enter your phone number"
          />

          {/* College */}
          <InputField
            label="Unique College Name"
            name="college_name"
            icon={<MdSchool />}
            value={formData.college_name}
            onChange={handleChange}
            type="text"
            placeholder="Your college name"
          />

          {/* User Type */}
          <div>
            <label className="block text-gray-800 font-semibold mb-1">User Type</label>
            <div className="flex items-center bg-white/70 border rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-purple-400 transition">
              <FaUserShield className="text-xl text-gray-500 mr-2" />
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-gray-700 font-medium"
              >
                <option value="student">Student</option>
                <option value="admin">Admin</option>
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold py-3 rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transform transition duration-300"
          >
            Register
          </button>

          {/* Navigation Link */}
          <div className="text-center mt-5">
            <span className="text-gray-700 text-sm">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/Login")}
                className="text-purple-700 font-semibold hover:underline"
              >
                Login here
              </button>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type, placeholder, icon }) => (
  <div>
    <label className="block text-gray-800 font-semibold mb-1">{label}</label>
    <div className="flex items-center bg-white/70 border rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-purple-400 transition">
      <span className="text-xl text-gray-500 mr-2">{icon}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        required
        value={value}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-gray-700 font-medium"
      />
    </div>
  </div>
);

export default SignUp;
