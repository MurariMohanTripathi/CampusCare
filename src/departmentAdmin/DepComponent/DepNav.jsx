import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DepartmentProfile from "./DepartmentProfile";

const ProfileModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-6">
        <DepartmentProfile onClose={onClose} />
      </div>
    </div>
  );
};

const DepNavbar = () => {
  const [showProfileModal, setProfileModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50">
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/DAdmin" className="flex items-center space-x-2">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 w-8"
                alt="CampusCare Logo"
              />
              <span className="text-xl font-bold text-gray-800 dark:text-white">
                CampusCare
              </span>
            </Link>

            {/* Mobile Toggle */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-gray-800 dark:text-white focus:outline-none"
              aria-label="Toggle menu"
            >
              ☰
            </button>

            {/* Menu Items */}
            <div className={`${isMenuOpen ? "block" : "hidden"} md:flex md:items-center`}>
              <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 text-sm font-medium">
                <li>
                  <Link
                    to="/DAdmin"
                    className={`block px-3 py-2 rounded-md transition ${
                      isActive("/DAdmin")
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    }`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/DAdmin"
                    className={`block px-3 py-2 rounded-md transition ${
                      isActive("/DepAnnouncements")
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    }`}
                  >
                    Announcements
                  </Link>
                </li>
                <li>
                  <Link
                    to="/DepartmentComplaints"
                    className={`block px-3 py-2 rounded-md transition ${
                      isActive("/DepartmentComplaints")
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-400"
                        : "text-gray-700 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-800"
                    }`}
                  >
                    Complaints
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => setProfileModal(true)}
                    className="block px-3 py-2 text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-blue-400 transition"
                  >
                    Profile
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Modal */}
      {showProfileModal && <ProfileModal onClose={() => setProfileModal(false)} />}
    </>
  );
};

export default DepNavbar;
