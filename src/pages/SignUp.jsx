import React, { useState } from "react";
import { get, ref, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { db, auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { AiOutlineMail, AiOutlinePhone } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";
import { MdSchool } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
import EmailVerificationComponent from "../component/EmailVerification";

const SignUp = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    userType: "student",
    college_name: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isEmailMarkedVerified, setIsEmailMarkedVerified] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === "email") validateEmail(value);
    if (name === "password") validatePassword(value);
    if (name === "phone") validatePhone(value);
  };

  const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setErrors((prev) => ({
      ...prev,
      email: emailRegex.test(value)
        ? ""
        : "Please enter a valid email address.",
    }));
  };

  const validatePassword = (value) => {
    const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    setErrors((prev) => ({
      ...prev,
      password: strongPassword.test(value)
        ? ""
        : "Password must be 8+ chars with uppercase, lowercase, number, and special char.",
    }));
  };

  const validatePhone = (value) => {
    const phoneRegex = /^[6-9]\d{9}$/;
    setErrors((prev) => ({
      ...prev,
      phone: phoneRegex.test(value)
        ? ""
        : "Phone must be 10 digits starting with 6-9.",
    }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!isEmailMarkedVerified) {
      alert("Please verify your email first.");
      return;
    }

    const { email, password, phone, userType, college_name } = formData;

    if (errors.email || errors.password || errors.phone) {
      alert("Please fix all errors before submitting.");
      return;
    }

    if (confirmPassword !== password) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const usersSnapshot = await get(ref(db, "users"));
      let collegeExists = false;

      if (usersSnapshot.exists()) {
        const usersData = usersSnapshot.val();
        for (let uid in usersData) {
          if (
            usersData[uid].college_name &&
            usersData[uid].college_name.toLowerCase() ===
              college_name.toLowerCase()
          ) {
            collegeExists = true;
            break;
          }
        }
      }

      if (userType === "student" && !collegeExists) {
        alert(
          "This college is not registered yet. Please contact your SuperAdmin to register the college first."
        );
        return;
      }

      if (userType === "SuperAdmin" && collegeExists) {
        alert(
          "College unique name is already taken. Please use a different name."
        );
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await sendEmailVerification(userCredential.user);
      const uid = userCredential.user.uid;

      await set(ref(db, "users/" + uid), {
        email,
        phone,
        type: userType,
        college_name,
      });

      alert(
        "User registered successfully! A verification email has been sent. Please verify before logging in."
      );

      // if (userType === "student") navigate("/Homepage");
      // else navigate("/HomepageAdmin");
    } catch (error) {
      alert("Registration failed: " + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gradient-to-br from-[#8cbed1] via-[#3866e2] to-[#ad7261]">
      <div className="w-full max-w-2xl bg-white/30 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 p-10 sm:p-12 animate-fade-in">
        <h2 className="text-4xl font-extrabold text-center text-[#3b0764] mb-8 drop-shadow-md">
          Create Your Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <InputField
            label="Email"
            name="email"
            icon={<AiOutlineMail />}
            value={formData.email}
            onChange={handleChange}
            type="email"
            placeholder="you@example.com"
            error={errors.email}
          />

          <InputField
            label="Password"
            name="password"
            icon={<RiLockPasswordLine />}
            value={formData.password}
            onChange={handleChange}
            type="password"
            placeholder="Create a password"
            error={errors.password}
          />

          <InputField
            label="Confirm Password"
            name="confirmPassword"
            icon={<RiLockPasswordLine />}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm your password"
            error={
              confirmPassword &&
              confirmPassword !== formData.password &&
              "Passwords do not match."
            }
          />

          <EmailVerificationComponent
            email={formData.email}
            password={formData.password}
            onMarkVerified={() => setIsEmailMarkedVerified(true)}
          />

          <InputField
            label="Phone Number"
            name="phone"
            icon={<AiOutlinePhone />}
            value={formData.phone}
            onChange={handleChange}
            type="text"
            placeholder="Enter your phone number"
            error={errors.phone}
          />

          <InputField
            label="Unique College Name"
            name="college_name"
            icon={<MdSchool />}
            value={formData.college_name}
            onChange={handleChange}
            type="text"
            placeholder="Your college name"
          />

          <div>
            <label className="block text-gray-800 font-semibold mb-1">
              User Type
            </label>
            <div className="flex items-center bg-white/70 border rounded-xl px-4 py-2 shadow-inner focus-within:ring-2 focus-within:ring-purple-400 transition">
              <FaUserShield className="text-xl text-gray-500 mr-2" />
              <select
                name="userType"
                value={formData.userType}
                onChange={handleChange}
                className="w-full outline-none bg-transparent text-gray-700 font-medium"
              >
                <option value="student">Student</option>
                <option value="SuperAdmin">SuperAdmin</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={!isEmailMarkedVerified}
            className={`w-full font-bold py-3 rounded-xl shadow-lg transform transition duration-300 ${
              isEmailMarkedVerified
                ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:shadow-2xl hover:scale-[1.02]"
                : "bg-gray-300 text-gray-600 cursor-not-allowed"
            }`}
          >
            Register
          </button>

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

const InputField = ({
  label,
  name,
  value,
  onChange,
  type,
  placeholder,
  icon,
  error,
}) => (
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
    {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
  </div>
);

export default SignUp;
