import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set, get } from "firebase/database";
import { auth, db } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { X } from "lucide-react"; // Optional icon

const SuperAdminModal = ({ onClose }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    phone: "",
    college_name: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCollegeName = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to register a Super Admin.");
        return;
      }

      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const userData = snapshot.val();
        if (userData.type !== "SuperAdmin") {
          setError("Only SuperAdmins can register new Super Admins.");
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
        college_name: formData.college_name,
        type: "SuperAdmin",
      });

      alert("Super Admin created successfully!");
      navigate("/Login");
    } catch (err) {
      setError("Signup failed: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md mx-auto p-6 sm:p-8">
        {/* Close Button */}
        {onClose && (
          <button
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        )}

        <h2 className="text-2xl font-semibold text-center text-indigo-700 mb-4">
          Register Super Admin
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            required
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="text"
            name="college_name"
            placeholder="College Name"
            readOnly
            value={formData.college_name}
            className="w-full p-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
          />

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2.5 rounded-lg transition"
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminModal;
