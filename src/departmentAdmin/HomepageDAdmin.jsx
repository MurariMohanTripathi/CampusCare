import React, { useState } from 'react';
import { Megaphone, Inbox, BarChart2, UserCircle } from 'lucide-react';
import DepNavbar from './DepComponent/DepNav';
import DepAnnouncementForm from './DepComponent/DepAnnouncementForm';

const actions = [
  {
    title: 'Manage Complaints',
    description: 'View and resolve department complaints.',
    icon: <Inbox className="w-6 h-6 text-blue-600" />,
    link: '/DepartmentComplaints',
  },
  {
    title: 'Post Announcement',
    description: 'Send department-wide notices or updates.',
    icon: <Megaphone className="w-6 h-6 text-green-600" />,
    link: '/PostAnnouncement',
  },
  {
    title: 'View Statistics',
    description: 'Track complaint resolution metrics.',
    icon: <BarChart2 className="w-6 h-6 text-purple-600" />,
    link: '/DepartmentStats',
  },
  {
    title: 'Profile Settings',
    description: 'Update your department admin details.',
    icon: <UserCircle className="w-6 h-6 text-gray-600" />,
    link: '/ProfileSettings',
  },
];

const HomepageDAdmin = () => {
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);

  const handleClick = (title) => {
    if (title === 'Post Announcement') {
      setShowAnnouncementModal(true);
    } else if (title === 'Manage Complaints') {
      window.location.href = '/DepartmentComplaints';
    } else if (title === 'View Statistics') {
      window.location.href = '/DepartmentStats';
    } else if (title === 'Profile Settings') {
      window.location.href = '/ProfileSettings';
    }
  };

  return (
    <>
      <DepNavbar />
      <div className="min-h-screen bg-gradient-to-tr from-blue-100 via-cyan-100 to-purple-100 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-blue-800 text-center mb-8">
            Welcome, Department Admin!
          </h1>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {actions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleClick(item.title)}
                className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition hover:scale-[1.02] cursor-pointer border border-gray-200"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-gray-100 rounded-full">{item.icon}</div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                </div>
                <p className="text-sm text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ✅ Modal for Post Announcement */}
      {showAnnouncementModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="relative w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
            <button
              onClick={() => setShowAnnouncementModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
            >
              ✕
            </button>
            <DepAnnouncementForm />
          </div>
        </div>
      )}
    </>
  );
};


export default HomepageDAdmin;
