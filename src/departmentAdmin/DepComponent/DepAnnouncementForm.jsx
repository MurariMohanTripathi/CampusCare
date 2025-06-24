import React, { useState, useEffect } from 'react';
import { ref, push, get } from 'firebase/database';
import { db, auth } from '../../firebase';


const DepAnnouncementForm = ({ onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [college_name, setCollegeName] = useState('');

  useEffect(() => {
    const fetchCollegeName = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return setError('User not logged in');

        const userRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val();

        if (!snapshot.exists()) return setError('User data not found');
        if (userData.type !== 'DepartmentAdmin') return setError('Only SuperAdmins And Department Admins can create announcements');

        setCollegeName(userData.college_name);
      } catch (err) {
        setError('Failed to load user data: ' + err.message);
      }
    };
    fetchCollegeName();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const user = auth.currentUser;
      if (!user) return setError('User not logged in');

      const userRef = ref(db, `users/${user.uid}`);
      const snapshot = await get(userRef);
      if (!snapshot.exists()) return setError('User data not found');

      const userData = snapshot.val();
      if (userData.type !== 'SuperAdmin') return setError('Only SuperAdmins can create announcements');

      const announcementData = {
        title,
        description,
        priority,
        college_name: userData.college_name,
        timestamp: new Date().toISOString(),
        createdBy: user.uid,
      };

      await push(ref(db, `announcements`), announcementData);

      setSuccess('✅ Announcement created successfully!');
      setTitle('');
      setDescription('');
      setPriority('low');

      setTimeout(() => onClose && onClose(), 1500);
    } catch (err) {
      setError('❌ Failed to create announcement: ' + err.message);
    }
  };

  return (
    <>
    <div className="w-full animate-fadeIn">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6 tracking-wide">
        📣 Create Announcement
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Title */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter announcement title"
            required
            className="px-4 py-2 rounded-lg border border-gray-300 shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* College */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">College</label>
          <input
            type="text"
            value={college_name}
            readOnly
            className="px-4 py-2 rounded-lg bg-gray-100 font-semibold text-indigo-700 border border-gray-300 shadow-inner"
          />
        </div>

        {/* Description */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
            placeholder="Write your announcement details..."
            className="px-4 py-2 rounded-lg border border-gray-300 resize-none shadow-sm focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {/* Priority */}
        <div className="flex flex-col">
          <label className="mb-1 font-medium text-gray-700">Priority</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className={`px-4 py-2 rounded-lg border focus:outline-none shadow-sm focus:ring-2 transition
              ${priority === 'high' ? 'border-red-400 focus:ring-red-500 text-red-700' : ''}
              ${priority === 'medium' ? 'border-yellow-400 focus:ring-yellow-500 text-yellow-700' : ''}
              ${priority === 'low' ? 'border-green-400 focus:ring-green-500 text-green-700' : ''}
            `}
          >
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 rounded-lg shadow-md transition-all duration-300"
        >
          🚀 Publish Announcement
        </button>

        {/* Alerts */}
        {error && (
          <div className="mt-2 p-2 text-sm bg-red-100 text-red-700 border border-red-300 rounded">
            {error}
          </div>
        )}
        {success && (
          <div className="mt-2 p-2 text-sm bg-green-100 text-green-700 border border-green-300 rounded">
            {success}
          </div>
        )}
      </form>
    </div>
    </>
  );
};

export default DepAnnouncementForm;
