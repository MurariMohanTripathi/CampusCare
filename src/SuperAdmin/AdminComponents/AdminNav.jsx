import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const AdminNav = () => {
  const [display, setDisplay] = useState("hidden");
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="xl:max-w-screen-xl flex flex-wrap items-center justify-between xl:mx-auto p-4">
          <Link
            to="/HomepageAdmin"
            className="flex items-center xl:space-x-3 xl:rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center xl:text-2xl font-semibold whitespace-nowrap dark:text-white">
              CampusCare
            </span>
          </Link>
          <span>
            <button
              className="md:hidden text-white ml-[5rem] cursor-pointer"
              onClick={() => {
                setDisplay(display === "hidden" ? "" : "hidden");
              }}
            >
              ☰
            </button>
          </span>

          <div className={`${display} w-full md:block md:w-auto`} id="navbar-default">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <Link
                  to="/HomepageAdmin"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    isActive("/HomepageAdmin")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                  }`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/Controls"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    isActive("/Controls")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                  }`}
                >
                  Controls
                </Link>
              </li>
              <li>
                <Link
                  to="/Services"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    isActive("/Services")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                  }`}
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/SuperAdminAnnouncement"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    isActive("/SuperAdminAnnouncement")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                  }`}
                >
                  Announcement
                </Link>
              </li>
              <li>
                <Link
                  to="/AdminProfile"
                  className={`block py-2 px-3 rounded-sm md:p-0 ${
                    isActive("/AdminProfile")
                      ? "text-white bg-blue-700 md:bg-transparent md:text-blue-700 dark:text-white md:dark:text-blue-500"
                      : "text-gray-900 hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 dark:text-white md:dark:hover:text-blue-500"
                  }`}
                >
                  profile
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default AdminNav;
