import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [display, setDisplay] = useState("hidden");
  const location = useLocation();

  // Function to determine if current path matches the link
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow">
      <div className="xl:max-w-screen-xl flex flex-wrap items-center justify-between xl:mx-auto p-4">
        <Link
          to="/Homepage"
          className="flex items-center xl:space-x-3 xl:rtl:space-x-reverse"
        >
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="h-8"
            alt="CampusCare Logo"
          />
          <span className="self-center xl:text-2xl font-semibold whitespace-nowrap dark:text-white">
            CampusCare
          </span>
        </Link>

        <button
          className="md:hidden text-white ml-[5rem] cursor-pointer"
          onClick={() => {
            setDisplay(display === "hidden" ? "" : "hidden");
          }}
        >
          ☰
        </button>

        <div className={`${display} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/Homepage"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/Homepage")
                    ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/StudentAnnouncements"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/StudentAnnouncements")
                    ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Announcements
              </Link>
            </li>
            <li>
              <Link
                to="/ComplaintDetailPage"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/ComplaintDetailPage")
                    ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Complaints
              </Link>
            </li>
            <li>
              <Link
                to="/ProfilePage"
                className={`block py-2 px-3 rounded-sm md:p-0 ${
                  isActive("/ProfilePage")
                    ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-blue-500"
                    : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                }`}
              >
                Profile
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
