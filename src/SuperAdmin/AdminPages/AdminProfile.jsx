import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Navbar from "../AdminComponents/AdminNav";

const AdminProfile = () => {
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
      <div className="flex justify-center items-center h-screen bg-gradient-to-br from-amber-100 to-blue-200">
        <p className="text-gray-600 text-lg animate-pulse">Loading user data...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-amber-100 to-blue-200 flex justify-center items-start py-20 px-4">
        <div className="w-full max-w-2xl bg-white bg-opacity-90 backdrop-blur-sm rounded-2xl shadow-2xl border border-gray-300 p-8 transition-all duration-300">
          <h2 className="text-3xl font-bold mb-6 text-blue-700 flex items-center gap-2">
            👤 Profile Information
          </h2>

          <div className="space-y-3 text-gray-800 text-base leading-relaxed">
            <p><span className="font-semibold text-gray-600">Email:</span> {user.email}</p>
            <p><span className="font-semibold text-gray-600">Email Verified:</span> {user.emailVerified ? "Yes ✅" : "No ❌"}</p>
            <p><span className="font-semibold text-gray-600">UID:</span> {user.uid}</p>
            <p><span className="font-semibold text-gray-600">Account Created:</span> {user.metadata.creationTime}</p>
            <p><span className="font-semibold text-gray-600">Last Sign-In:</span> {user.metadata.lastSignInTime}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="mt-8 w-full bg-red-500 hover:bg-red-600 text-white font-medium py-2.5 rounded-md shadow-md hover:shadow-lg transition-all duration-200"
          >
            🚪 Sign Out
          </button>
        </div>
      </div>
    </>
  );
};

export default AdminProfile;
