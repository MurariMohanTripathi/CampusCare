import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import DepartmentProfile from "./DepartmentProfile";

const ProfileModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
    <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl p-6">
      <DepartmentProfile onClose={onClose} />
    </div>
  </div>
);

const DepNavbar = () => {
  const [isMenuVisible, setMenuVisible] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
        <div className="xl:max-w-screen-xl flex flex-wrap items-center justify-between xl:mx-auto p-4">
          {/* Logo */}
          <Link to="/DAdmin" className="flex items-center xl:space-x-3 xl:rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="CampusCare Logo"
            />
            <span className="self-center xl:text-2xl font-semibold whitespace-nowrap dark:text-white">
              CampusCare
            </span>
          </Link>

          {/* Toggle Button */}
          <button
            className="md:hidden text-gray-800 dark:text-white ml-8"
            onClick={() => setMenuVisible(!isMenuVisible)}
          >
            ☰
          </button>

          {/* Menu */}
          <div className={`${isMenuVisible ? "" : "hidden"} w-full md:block md:w-auto`} id="navbar-dep">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/DAdmin"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    isActive("/DAdmin")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/DAdmin"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    isActive("/DepAnnouncements")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                  }`}
                >
                  Announcements
                </Link>
              </li>
              <li>
                <Link
                  to="/DepartmentComplaints"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    isActive("/DepartmentComplaints")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                  }`}
                >
                  Complaints
                </Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setShowProfileModal(true);
                    setMenuVisible(false); // Close menu on mobile
                  }}
                  className="block py-2 px-3 rounded-sm md:p-0 text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                >
                  Profile
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {showProfileModal && <ProfileModal onClose={() => setShowProfileModal(false)} />}
    </>
  );
};

export default DepNavbar;
