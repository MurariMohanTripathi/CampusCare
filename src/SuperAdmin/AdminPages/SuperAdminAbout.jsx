import React from 'react'
import Navbar from '../AdminComponents/AdminNav'
const SuperAdminAbout = () => {
  return (
    <>
    <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-amber-200 to-blue-300 py-10 px-4 sm:px-8 md:px-16">
        {/* Header */}
        <h1 className="text-4xl font-bold text-center mb-6">🧾 About Us</h1>
        <p className="text-center text-lg font-medium max-w-4xl mx-auto mb-10">
          Welcome to <strong>CampusCare</strong> – a dedicated platform designed to bridge the gap between students and the institution by offering a streamlined and transparent way to raise and resolve complaints.
        </p>

        {/* Mission Section */}
        <h2 className="text-3xl font-semibold text-center mt-10 mb-3">🎯 Our Mission</h2>
        <p className="text-center text-lg font-medium max-w-4xl mx-auto mb-10">
          To empower students with a voice and provide a structured system to report their concerns efficiently—be it academic, hostel, infrastructure, or administrative issues—ensuring they're heard, addressed, and resolved in a timely manner.
        </p>

        {/* Two-Column Info Section */}
        <div className="grid md:grid-cols-2 gap-6 mt-10">
          {/* What We Offer */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-yellow-200 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">🛠️ What We Offer</h3>
            <ul className="list-disc pl-6 space-y-2 text-base font-medium text-gray-700">
              <li>User-Friendly Complaint Submission: Raise issues through a clean, guided interface.</li>
              <li>Real-Time Tracking: Keep tabs on the status of your complaint.</li>
              <li>Transparency & Accountability: Promoting fair treatment through documented processes.</li>
              <li>Category-wise Segmentation: Complaints are sorted to the relevant department automatically.</li>
              <li>Attachments Support: Add documents or images to support your claims.</li>
            </ul>
          </div>

          {/* Who Is It For */}
          <div className="bg-white shadow-lg rounded-xl p-6 hover:shadow-yellow-200 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">🧑‍🎓 Who Is It For?</h3>
            <ul className="list-disc pl-6 space-y-2 text-base font-medium text-gray-700">
              <li>Students facing academic, hostel, or facility-related challenges.</li>
              <li>Faculty members seeking structured feedback.</li>
              <li>Admin teams that need complaint data for improvement planning.</li>
            </ul>
          </div>
        </div>

        {/* Commitment */}
        <h2 className="text-3xl font-semibold text-center mt-14 mb-3">🤝 Our Commitment</h2>
        <p className="text-center text-lg font-medium max-w-4xl mx-auto">
          We are committed to creating a safe, reliable, and efficient platform where students feel confident that their voices are acknowledged and their concerns matter.
        </p>
      </div>
    </>
  )
}

export default SuperAdminAbout
