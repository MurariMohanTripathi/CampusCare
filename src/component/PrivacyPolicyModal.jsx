import React from 'react';
import { X } from 'lucide-react';

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-white text-black max-w-2xl w-full p-6 rounded-lg shadow-xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>

        <p className="text-sm text-gray-800 mb-4">
          <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
        </p>

        <div className="space-y-4 text-sm text-gray-700">
          <p>
            <strong>CampusCare</strong> is committed to protecting your privacy. This Privacy Policy describes how we collect, use, and safeguard your information.
          </p>

          <p>
            <strong>1. Information We Collect:</strong> We collect personal details such as name, email, phone number, and complaint information provided during login, registration, and form submissions.
          </p>

          <p>
            <strong>2. Use of Information:</strong> Your information is used to:
            <ul className="list-disc list-inside ml-4">
              <li>Manage and resolve complaints</li>
              <li>Send relevant notifications and announcements</li>
              <li>Maintain your user profile</li>
              <li>Improve our services</li>
            </ul>
          </p>

          <p>
            <strong>3. Data Storage:</strong> All user data is securely stored in Firebase Realtime Database. We do not share your data with third-party services without consent.
          </p>

          <p>
            <strong>4. Security:</strong> We take appropriate measures to secure your data through Firebase Authentication and secure communication.
          </p>

          <p>
            <strong>5. User Rights:</strong> You may request deletion or modification of your data by contacting us directly.
          </p>

          <p>
            <strong>6. Changes:</strong> We may update this Privacy Policy occasionally. Continued use of the platform after changes constitutes your acceptance.
          </p>

          <p>
            <strong>7. Contact:</strong> For questions, contact us at <a href="mailto:tripathimurari599@gmail.com" className="text-blue-600 underline">tripathimurari599@gmail.com</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyModal;
