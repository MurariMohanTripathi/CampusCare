import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../component/Footer';

const About = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-orange-100 to-blue-100 px-6 py-10 sm:px-12 md:px-20">
        {/* Header */}
        <header className="mb-10">
          <Link to="/" className="flex items-center space-x-3 hover:opacity-90 transition">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              alt="CampusCare Logo"
              className="h-10"
            />
            <span className="text-3xl font-bold text-gray-800">CampusCare</span>
          </Link>
        </header>

        <section className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">🧾 About CampusCare</h1>
          <p className="text-lg font-medium text-gray-700">
            CampusCare is a complete campus complaint & communication system built to empower students and simplify issue resolution through a structured digital platform.
          </p>
        </section>

        {/* Our Mission */}
        <section className="mt-14 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-3">🎯 Our Mission</h2>
          <p className="text-lg font-medium text-gray-700">
            To bridge the gap between students and institutions by offering a transparent, efficient, and accountable system for complaints and announcements — ensuring student voices are always heard.
          </p>
        </section>

        {/* Features Grid */}
        <section className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Platform Features */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-yellow-300 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">⚙️ Key Features</h3>
            <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
              <li>📨 Complaint submission with attachments & priority selection</li>
              <li>⏱️ Real-time status tracking (Pending, In Progress, Resolved)</li>
              <li>📁 Department-based automatic routing of complaints</li>
              <li>🗣️ AI-based chatbot to assist in complaint creation (coming soon)</li>
              <li>📣 SuperAdmins & Admins can release announcements to students</li>
              <li>🔐 Role-based dashboards: Student, Admin, SuperAdmin</li>
              <li>💰 Razorpay-integrated plan subscriptions (Free, Premium, Enterprise)</li>
            </ul>
          </div>

          {/* Role-Based Access */}
          <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-yellow-300 transition duration-300">
            <h3 className="text-2xl font-semibold mb-4">🔐 Who Uses CampusCare?</h3>
            <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
              <li>🎓 Students — to raise and track complaints</li>
              <li>🏢 Department Admins — to manage and respond to issues</li>
              <li>👑 SuperAdmins — to control departments, plans, and overall operations</li>
              <li>📚 Faculty — to share lecture notes & resources</li>
            </ul>
          </div>
        </section>

        {/* Plans Overview */}
        <section className="mt-16 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-4">💼 Subscription Plans</h2>
          <p className="text-lg font-medium text-gray-700 mb-6">
            CampusCare offers a flexible plan system to support institutions of all sizes.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-blue-200">
              <h3 className="text-xl font-semibold">Free</h3>
              <p className="text-sm text-gray-600 mt-2">Basic functionality with limited complaint & admin quotas.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-blue-200">
              <h3 className="text-xl font-semibold">Premium</h3>
              <p className="text-sm text-gray-600 mt-2">Increased limits on submissions and announcements.</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow hover:shadow-blue-200">
              <h3 className="text-xl font-semibold">Enterprise</h3>
              <p className="text-sm text-gray-600 mt-2">Unlimited access for large institutions.</p>
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="mt-20 text-center max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold mb-3">🤝 Our Commitment</h2>
          <p className="text-lg font-medium text-gray-700">
            CampusCare is committed to building a modern, scalable ecosystem that fosters communication, accountability, and student well-being across campuses.
          </p>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default About;
