import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../component/Footer";
import { ToastContainer, toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleAIChatClick = () => {
    toast("🧠 AI Chat Support Coming Soon!", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      transition: Zoom,
      theme: "dark",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-blue-50 via-emerald-100 to-cyan-50 text-gray-800 relative">
        {/* HERO SECTION */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 py-20 flex flex-col items-center text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight drop-shadow-sm">
            Revolutionizing Campus Communication
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-gray-700 max-w-3xl">
            CampusCare is your one-stop platform for seamless issue reporting, real-time announcements, and department-wise management — crafted for modern campuses.
          </p>
          <button
            onClick={() => navigate("/Login")}
            className="mt-10 bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 text-lg sm:text-xl rounded-full font-semibold shadow-lg transition transform hover:scale-105"
          >
            Login / Register
          </button>
        </section>

        {/* FEATURES SECTION */}
        <section className="bg-white py-16 px-6 sm:px-10 lg:px-20 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-12">
            Why Choose CampusCare?
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {[
              {
                icon: "📢",
                title: "Transparent Communication",
                desc: "Complaints and announcements are organized by user roles for clear visibility.",
              },
              {
                icon: "⚡",
                title: "Quick Resolutions",
                desc: "Well-defined statuses help users track progress and ensure accountability.",
              },
              {
                icon: "🛡️",
                title: "Secure Role-Based Access",
                desc: "Students, Admins, and SuperAdmins have properly scoped permissions.",
              },
              {
                icon: "📊",
                title: "Dashboard Insights",
                desc: "Visual analytics help measure performance and issue trends across departments.",
              },
              {
                icon: "🌐",
                title: "Centralized Portal",
                desc: "All users interact through one clean, intuitive interface.",
              },
              {
                icon: "🔔",
                title: "Real-Time Notifications",
                desc: "Instant alerts for announcements, status updates, and responses.",
              },
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-xl transform transition duration-300 hover:scale-105"
              >
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-gradient-to-br from-blue-100 via-cyan-100 to-emerald-50 text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Ready to Transform Your Campus Experience?
          </h2>
          <button
            onClick={() => navigate("/SignUp")}
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 text-lg rounded-full font-semibold shadow-lg transition transform hover:scale-105 duration-300"
          >
            Get Started Now
          </button>
        </section>

        {/* Floating AI Chat Support Button */}
        <button
          onClick={handleAIChatClick}
          className="
            fixed bottom-6 right-6 z-50
            bg-gradient-to-tr from-blue-500 to-indigo-600
            text-white text-xl p-5 rounded-full
            shadow-xl hover:shadow-2xl
            transition-transform duration-300 ease-in-out
            hover:scale-110 animate-bounce
            focus:outline-none focus:ring-4 focus:ring-blue-300
          "
          aria-label="Chat with AI Support"
        >
          💬
        </button>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;
