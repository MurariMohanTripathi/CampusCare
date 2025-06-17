import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdOutlineWorkspacePremium } from "react-icons/md";
import { BsRocketTakeoff } from "react-icons/bs";
import AdminNav from "../AdminComponents/AdminNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const plans = [
  {
    name: "Free Plan",
    price: "₹0",
    badge: "Free",
    features: [
      "1 Announcement per week",
      "Limited support",
      "Basic dashboard access",
    ],
    isPopular: false,
    color: "border-amber-300",
    icon: (
      <FaCheckCircle className="text-amber-500 text-4xl group-hover:scale-110 transition-transform" />
    ),
    qr: null,
  },
  {
    name: "Premium Plan",
    price: "₹299/month",
    badge: "Popular",
    features: [
      "Unlimited Announcements",
      "Priority support",
      "Advanced dashboard features",
    ],
    isPopular: true,
    color: "border-blue-300",
    icon: (
      <MdOutlineWorkspacePremium className="text-blue-500 text-5xl group-hover:scale-110 transition-transform" />
    ),
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=tripathimurari599@okhdfcbank&pn=CampusCare&am=299&cu=INR",
  },
  {
    name: "Enterprise Plan",
    price: "₹599/month",
    badge: "Pro",
    features: [
      "Custom branding",
      "Dedicated account manager",
      "Full analytics & insights",
    ],
    isPopular: false,
    color: "border-indigo-300",
    icon: (
      <BsRocketTakeoff className="text-indigo-500 text-5xl group-hover:scale-110 transition-transform" />
    ),
    qr: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=upi://pay?pa=tripathimurari599@okhdfcbank&pn=CampusCare&am=599&cu=INR",
  },
];

const SuperAdminServices = () => {
  const [selectedQR, setSelectedQR] = useState(null);

  const handleUpgradeClick = (qrLink) => {
    if (qrLink) setSelectedQR(qrLink);
  };

  return (
    <>
      <AdminNav />
      <ToastContainer />
      <div className="min-h-screen bg-gradient-to-br from-amber-100 to-blue-200 p-6 md:p-12 text-gray-800">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold mb-3 text-blue-900 tracking-tight">
            💼 Plans & Services
          </h2>
          <p className="text-gray-700 text-lg mb-12">
            Choose a plan that suits your institution’s needs.
          </p>

          <div className="grid md:grid-cols-3 gap-10">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`group relative bg-white p-8 border-2 rounded-2xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-[1.02] ${
                  plan.color
                } ${plan.isPopular ? "ring-2 ring-blue-400" : ""}`}
              >
                <span className="absolute top-4 right-4 bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                  {plan.badge}
                </span>

                <div className="flex flex-col items-center justify-center">
                  {plan.icon}
                  <h3 className="text-2xl font-bold mt-4 text-blue-800">
                    {plan.name}
                  </h3>
                  <p className="text-4xl font-semibold text-blue-700 my-4">
                    {plan.price}
                  </p>
                </div>

                <ul className="text-left space-y-3 mb-8 text-sm text-gray-700">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <FaCheckCircle className="text-amber-500 mt-1" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105"
                  onClick={() => handleUpgradeClick(plan.qr)}
                >
                  {plan.price === "₹0" ? "Start for Free" : "Upgrade Now"}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      {selectedQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-2xl shadow-lg max-w-sm w-full text-center">
            <h3 className="text-xl font-bold mb-4 text-blue-700">
              Scan & Pay via UPI
            </h3>
            <img src={selectedQR} alt="QR Code" className="mx-auto mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Mail payment details to{" "}
              <a
                href="mailto:tripathimurari599@gmail.com"
                className="text-blue-600 underline"
              >
                tripathimurari599@gmail.com
              </a>{" "}
              within 24 hours. Account status will be updated after
              verification.
            </p>

            <button
              onClick={() => {
                setSelectedQR(null);
                toast.success(
                  "Thanks for choosing CampusCare! Email your payment proof."
                );
              }}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SuperAdminServices;
