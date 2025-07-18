import React from "react";
import { Link } from "react-router-dom";
import {
  FaEnvelope,
  FaPhoneAlt,
  FaLinkedin,
  FaGithub,
  FaTwitter,
} from "react-icons/fa";
import { useState } from 'react';
import ContactModal from '../pages/Contact'; // Adjust path if needed
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import BlogModal from "./BlogModal";
import DocumentationModal from "./DocumentationModal";
import SystemStatusModal from "./SystemStatusModal";


const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrivacyOpen,setPrivacyOpen] = useState(false);
  const[isBlogOpen,setBlogOpen] = useState(false);
  const[isDocumentOpen,setDocumentOpen] = useState(false);
  const[isSystemOpen,setSystemOpen] = useState(false);


  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* About Section */}
        <div>
          <Link
            to="/"
            className="flex items-center mb-4 hover:opacity-90 transition"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              alt="CampusCare Logo"
              className="h-9 mr-2"
            />
            <span className="text-2xl font-bold">CampusCare</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            CampusCare is a modern complaint resolution system built to empower
            students and administrators by streamlining communication within
            institutions.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-200">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <Link to="/Login" className="hover:text-white transition">
                Student Portal
              </Link>
            </li>
            <li>
              <Link to="/Login" className="hover:text-white transition">
                Admin Portal
              </Link>
            </li>
            <li>
              <Link to="/About" className="hover:text-white transition">
                About Us
              </Link>
            </li>
            <li>
              <button
                onClick={() => setIsModalOpen(true)}
                className="hover:text-white transition"
              >
                Contact
              </button>
            </li>

          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-200">
            Resources
          </h3>
          <ul className="space-y-2 text-sm text-gray-400">
            <li>
              <button
                onClick={()=>setDocumentOpen(true)}
                className="hover:text-white transition"
              >
                Documentation
              </button>
            </li>
            <li>
              <button
                onClick={()=>setBlogOpen(true)}
                className="hover:text-white transition"
              >
                Blog
              </button>
            </li>
            <li>
              <button
                onClick={()=>setSystemOpen(true)}
                className="hover:text-white transition"
              >
                System Status
              </button>
            </li>
            <li>
              <button onClick={()=>setPrivacyOpen(true)} className="hover:text-white transition">
                Privacy Policy
              </button>
            </li>
          </ul>
        </div>

        {/* Contact & Socials */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-blue-200">
            Connect With Us
          </h3>
          <div className="flex items-center text-sm text-gray-400 mb-2">
            <FaEnvelope className="mr-2 text-blue-400" />
            <span>tripathimurari599@gmail.com</span>
          </div>
          <div className="flex items-center text-sm text-gray-400 mb-4">
            <FaPhoneAlt className="mr-2 text-green-400" />
            <span>+91-7839286085</span>
          </div>
          <div className="flex space-x-4 mt-4">
            <a
              href="https://www.linkedin.com/in/murarimohantripathi/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition"
            >
              <FaLinkedin size={20} />
            </a>
            <a
              href="https://github.com/MurariMohanTripathi/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-gray-300 transition"
            >
              <FaGithub size={20} />
            </a>
            <a
              href="https://twitter.com/murarimohantri2"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-sky-400 transition"
            >
              <FaTwitter size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CampusCare. All rights reserved. | Built
        with 💙 for student empowerment.
        <br />
        Developed with 💙 by
        <a
          href="https://github.com/MurariMohanTripathi"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 hover:underline ml-1"
        >
          Murari Mohan Tripathi
        </a>

      </div>
        <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        <PrivacyPolicyModal isOpen = {isPrivacyOpen} onClose={()=> setPrivacyOpen(false)} />
          <BlogModal isOpen = {isBlogOpen} onClose={()=>setBlogOpen(false)} />
          <DocumentationModal isOpen = {isDocumentOpen} onClose={()=>setDocumentOpen(false)} />
          <SystemStatusModal isOpen = {isSystemOpen} onClose={()=>setSystemOpen(false)} />
    </footer>
  );
};

export default Footer;
