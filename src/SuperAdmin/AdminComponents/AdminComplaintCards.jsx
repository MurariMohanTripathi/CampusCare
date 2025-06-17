import React from 'react';
import { FaClipboardList, FaHourglassHalf, FaExclamationTriangle, FaCalendarDay } from 'react-icons/fa';

const cardStats = [
  {
    title: 'Total Complaints',
    count: 120,
    icon: <FaClipboardList size={24} className="text-blue-600" />,
    color: 'bg-blue-50 border-blue-200',
  },
  {
    title: 'Pending Complaints',
    count: 45,
    icon: <FaHourglassHalf size={24} className="text-yellow-600" />,
    color: 'bg-yellow-50 border-yellow-200',
  },
  {
    title: 'Urgent Complaints',
    count: 12,
    icon: <FaExclamationTriangle size={24} className="text-red-600" />,
    color: 'bg-red-50 border-red-200',
  },
  {
    title: 'Complaints Today',
    count: 8,
    icon: <FaCalendarDay size={24} className="text-green-600" />,
    color: 'bg-green-50 border-green-200',
  },
];

const AdminComplaintCards = () => {
  return (
    <div className="px-4 md:px-10 pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardStats.map((card, index) => (
          <div
            key={index}
            className={`border ${card.color} rounded-xl p-6 shadow-sm hover:shadow-md transition-transform duration-300 hover:scale-[1.03]`}
          >
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-medium text-gray-600">{card.title}</h2>
              {card.icon}
            </div>
            <p className="text-3xl font-bold text-gray-800">{card.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminComplaintCards;
