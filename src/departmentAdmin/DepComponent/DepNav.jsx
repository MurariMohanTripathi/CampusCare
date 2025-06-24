import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import DepartmentProfile from "./DepartmentProfile";


const ProfileModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl p-4 sm:p-6">
        <DepartmentProfile onClose={onClose} />
      </div>
    </div>
  );
};
const DepNavbar = () => {
  const [showProfileModal, setProfileModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <nav className="bg-white border-b shadow-sm dark:bg-gray-900">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
          {/* Logo */}
          <Link to="/DAdmin" className="flex items-center space-x-3">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="CampusCare Logo"
            />
            <span className="text-2xl font-semibold dark:text-white">
              CampusCare
            </span>
          </Link>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-gray-700 dark:text-white focus:outline-none"
          >
            ☰
          </button>

          {/* Menu Items */}
          <div className={`${isMenuOpen ? "" : "hidden"} w-full md:block md:w-auto`}>
            <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 font-medium">
              <li>
                <Link
                  to="/DAdmin"
                  className="block px-3 py-2 text-blue-700 dark:text-blue-400"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/DAdmin"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 dark:text-white"
                >
                  Announcements
                </Link>
              </li>
              <li>
                <Link
                  to="/DAdmin"
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 dark:text-white"
                >
                  Complaints
                </Link>
              </li>
              <li>
                <button
                  onClick={() => setProfileModal(true)}
                  className="block px-3 py-2 text-gray-700 hover:text-blue-600 dark:text-white"
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Profile Modal */}
        {showProfileModal && (
          <ProfileModal onClose={() => setProfileModal(false)} />
        )}
      </nav>
    </>
  );
};

export default DepNavbar;
