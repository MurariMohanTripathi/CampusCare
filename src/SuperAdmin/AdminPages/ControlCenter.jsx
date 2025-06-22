import React, { useState } from 'react';
import AdminNav from '../AdminComponents/AdminNav';
import {
  UserPlus,
  Megaphone,
  Users,
  Inbox,
  BarChart2,
  Settings
} from 'lucide-react';
import AnnouncementForm from '../AdminComponents/AnnouncementForm';
import { useNavigate } from 'react-router-dom';

// Dummy Announcement Modal Component
const AnnouncementModal = ({ onClose }) => (
  <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
    <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-xl">
      {/* <h3 className="text-xl font-bold mb-4">Post New Announcement</h3> */}
      <p className="text-gray-600 mb-6"><AnnouncementForm /></p>
      <button
        onClick={onClose}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Close
      </button>
    </div>
  </div>
);

const controlOptions = [
  {
    title: 'Create Department Admins',
    description: 'Add new admins for specific departments in your institution.',
    icon: <UserPlus className="text-blue-600 w-6 h-6" />,
    bg: 'bg-blue-100',
    buttonText: 'Create Admins',
  },
  {
    title: 'Post Announcements',
    description: 'Send important updates and notices to all users.',
    icon: <Megaphone className="text-yellow-600 w-6 h-6" />,
    bg: 'bg-yellow-100',
    buttonText: 'Post Now',
  },
  {
    title: 'Manage Students',
    description: 'View, approve, or remove student accounts.',
    icon: <Users className="text-green-600 w-6 h-6" />,
    bg: 'bg-green-100',
    buttonText: 'Manage',
  },
  {
    title: 'View All Complaints',
    description: 'Check and resolve complaints from any department.',
    icon: <Inbox className="text-red-600 w-6 h-6" />,
    bg: 'bg-red-100',
    buttonText: 'Open Inbox',
  },
  {
    title: 'View Statistics',
    description: 'Analyze data trends and complaint performance.',
    icon: <BarChart2 className="text-purple-600 w-6 h-6" />,
    bg: 'bg-purple-100',
    buttonText: 'View Stats',
  },
  {
    title: 'System Settings',
    description: 'Manage access control, features, and more.',
    icon: <Settings className="text-gray-600 w-6 h-6" />,
    bg: 'bg-gray-200',
    buttonText: 'Configure',
  }
];

const ControlCenter = () => {
    const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleClick = (action) => {
    if (action === 'Post Now') {
      setShowModal(true);
    }
    if(action === 'Open Inbox'){
        navigate('/HomepageAdmin');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNav />

      <div className="max-w-6xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">Control Center</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {controlOptions.map((card, idx) => (
            <div
              key={idx}
              className="group relative bg-white p-6 border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 hover:scale-[1.02]"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${card.bg} group-hover:opacity-90 transition`}>
                  {card.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-800">{card.title}</h3>
              </div>

              <p className="text-gray-500 mt-4 mb-6">{card.description}</p>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                onClick={() => handleClick(card.buttonText)}
              >
                {card.buttonText}
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {showModal && <AnnouncementModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default ControlCenter;
