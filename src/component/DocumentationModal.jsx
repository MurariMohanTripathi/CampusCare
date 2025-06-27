import React from 'react';
import { X } from 'lucide-react';

const DocumentationModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const docs = [
    {
      title: 'Getting Started with CampusCare',
      content:
        'CampusCare is a complaint management platform for students and administrators. To get started, register as a student or admin using your institution code.',
    },
    {
      title: 'How Students Can File Complaints',
      content:
        'Go to your dashboard → Click "New Complaint" → Fill in subject, description, and priority. Your complaint will be routed to the respective department admin.',
    },
    {
      title: 'Admin Dashboard Overview',
      content:
        'Admins can view, update, and respond to complaints from their department. They can also publish announcements and monitor complaint statuses.',
    },
    {
      title: 'SuperAdmin Capabilities',
      content:
        'SuperAdmins have full control over the platform. They can manage college entries, subscription plans, and assign department admins across institutions.',
    },
    {
      title: 'Payment & Plan System',
      content:
        'CampusCare supports Free, Premium, and Enterprise plans. Payments are integrated via Razorpay and manage limits on complaint submissions and admin creation.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center px-4">
      <div className="bg-white text-black max-w-3xl w-full p-6 rounded-lg shadow-lg relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-red-500"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold mb-6">CampusCare Documentation</h2>

        <div className="space-y-6">
          {docs.map((doc, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-md shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold mb-1">{doc.title}</h3>
              <p className="text-gray-700 text-sm leading-relaxed">{doc.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentationModal;
