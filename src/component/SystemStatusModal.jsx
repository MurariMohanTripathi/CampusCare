import React from 'react';
import { X, CheckCircle, AlertTriangle} from 'lucide-react';

const SystemStatusModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const statusData = [
    {
      name: 'Firebase Authentication',
      status: 'Operational',
      message: 'All login/signup services are working correctly.',
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      name: 'Firebase Realtime Database',
      status: 'Operational',
      message: 'Database read/write operations are functioning smoothly.',
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      name: 'Firebase Storage',
      status: 'Operational',
      message: 'All file uploads and media access are normal.',
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      name: 'EmailJS Service',
      status: 'Minor Issues',
      message: 'Emails may be delayed. Please retry if failed.',
      icon: <CheckCircle className="text-green-500" />,
    },
    {
      name: 'Razorpay Payments',
      status: 'Operational',
      message: 'Manual Approval For now ',
      icon:  <AlertTriangle className="text-yellow-500" />,
    },
    {
      name: 'Hosting (Firebase)',
      status: 'Operational',
      message: 'CampusCare is live and reachable.',
      icon: <CheckCircle className="text-green-500" />,
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

        <h2 className="text-2xl font-bold mb-6">System Status</h2>

        <div className="space-y-4">
          {statusData.map((service, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-md flex items-start space-x-4 shadow-sm hover:shadow-md transition"
            >
              <div className="mt-1">{service.icon}</div>
              <div>
                <h3 className="text-lg font-semibold">{service.name}</h3>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">{service.status}</span> — {service.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SystemStatusModal;
