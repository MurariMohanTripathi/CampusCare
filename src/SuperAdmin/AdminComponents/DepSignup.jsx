import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const DepSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    department: "",
    college_name: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ Fetch logged-in user's college_name
useEffect(() => {
  const fetchCollegeName = async () => {
    const user = auth.currentUser;
    if (!user) {
      setError("You must be logged in to register a department admin.");
      return;
    }

    const userRef = ref(db, `users/${user.uid}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      const userData = snapshot.val();
      if (userData.type !== "SuperAdmin") {
        setError("Only SuperAdmins can register Department Admins.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        college_name: userData.college_name || "",
      }));
    } else {
      setError("Your admin data could not be found.");
    }
  };

  fetchCollegeName();
}, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const uid = userCredential.user.uid;

      await set(ref(db, "users/" + uid), {
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        college_name: formData.college_name,
        type: "DepartmentAdmin",
      });

      alert("Signup successful!");
      navigate("/Login");
    } catch (err) {
      setError("Signup failed: " + err.message);
    }
  };

  return (
    <div className="w-full bg-white/90 rounded-2xl shadow-2xl p-6 sm:p-8">
      <h2 className="text-xl font-bold text-center mb-4 text-indigo-800">
        Register Department Admin
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          value={formData.password}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          required
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          value={formData.phone}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="department"
          placeholder="Department Name"
          required
          value={formData.department}
          onChange={handleChange}
          className="w-full p-2.5 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-400"
        />
        <input
          type="text"
          name="college_name"
          placeholder="College Name"
          readOnly
          value={formData.college_name}
          className="w-full p-2.5 border border-gray-300 rounded-md bg-gray-100 text-gray-700"
        />

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-md transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default DepSignup;
