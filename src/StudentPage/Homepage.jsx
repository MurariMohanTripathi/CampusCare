import React, { useState, useEffect } from "react";
import Navbar from "./StudentComponents/Navbar";
import StatusCard from "./StudentComponents/StatusCard";
import ComplaintStatusPage from "./ComplaintStatusPage";
import ComplaintForm from "./StudentComponents/ComplaintForm";

const Homepage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleNewComplaint = () => {
    setShowModal(true);
  };

useEffect(() => {
  if (showModal) {
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // <-- ADD THIS
  } else {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  };
}, [showModal]);


  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-blue-50 pt-4 pb-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Status Cards */}
          <StatusCard />

          {/* My Complaints Section Header */}
          <div className="flex items-center justify-between mt-12 mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Complaints</h2>
            <button
              onClick={handleNewComplaint}
              className="bg-red-600 hover:bg-red-700 text-white text-sm sm:text-base py-2 px-4 rounded-full shadow transition duration-200"
            >
              + New Complaint
            </button>
          </div>

          {/* Complaint Table */}
          <ComplaintStatusPage />
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-hidden bg-white rounded-xl shadow-2xl p-6">
            <ComplaintForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default Homepage;
