import React, { useEffect, useState } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Navbar from "./StudentComponents/Navbar";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      alert("Signed out successfully!");
      window.location.href = "/";
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-gray-500 text-lg">Loading user data...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-amber-100 py-10 px-4">
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-2xl p-6 border border-gray-100">
          {/* Profile Icon */}
          <div className="flex flex-col items-center text-center">
            <FaUserCircle className="text-6xl text-blue-500 mb-2" />
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Profile Information</h2>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>

          {/* Info List */}
          <div className="mt-6 space-y-4 text-gray-700 text-sm">
            <p>
              <span className="font-semibold">Email Verified:</span>{" "}
              {user.emailVerified ? "Yes ✅" : "No ❌"}
            </p>
            <p>
              <span className="font-semibold">UID:</span> {user.uid}
            </p>
            <p>
              <span className="font-semibold">Account Created:</span>{" "}
              {user.metadata.creationTime}
            </p>
            <p>
              <span className="font-semibold">Last Sign-In:</span>{" "}
              {user.metadata.lastSignInTime}
            </p>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleSignOut}
            className="mt-6 w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-md text-sm font-medium transition duration-200"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
