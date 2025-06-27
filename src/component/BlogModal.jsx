import React from 'react';
import { X } from 'lucide-react';

const BlogModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const blogPosts = [
    {
      title: 'How to File a Complaint Effectively',
      date: 'June 20, 2025',
      content:
        'Learn how to submit clear, actionable complaints in CampusCare to get faster resolutions from your department admins.',
    },
    {
      title: 'CampusCare Premium Plan Benefits',
      date: 'June 12, 2025',
      content:
        'Explore the features included in our Premium Plan, such as multi-admin support, increased complaint limits, and priority responses.',
    },
    {
      title: 'Data Privacy in CampusCare',
      date: 'May 30, 2025',
      content:
        'Your data is stored securely using Firebase. Find out how we manage authentication, storage, and user protection.',
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

        <h2 className="text-2xl font-bold mb-6">CampusCare Blog</h2>

        <div className="space-y-6">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="p-4 bg-gray-100 rounded-md shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-sm text-gray-500 mb-2">{post.date}</p>
              <p className="text-gray-700 text-sm">{post.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
