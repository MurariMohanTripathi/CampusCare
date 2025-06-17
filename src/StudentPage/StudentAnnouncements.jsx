import React, { useEffect, useState } from 'react';
import { ref, onValue, get, child } from 'firebase/database';
import { db, auth } from '../firebase';
import StudentNav from './StudentComponents/Navbar';

const StudentAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const user = auth.currentUser;
      if (!user) return;

      try {
        const userSnapshot = await get(child(ref(db), `users/${user.uid}`));
        const userCollege = userSnapshot.val()?.college_name;
        if (!userCollege) return;

        const announcementsRef = ref(db, 'announcements');
        onValue(announcementsRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const filtered = Object.entries(data)
              .map(([id, announcement]) => ({ id, ...announcement }))
              .filter((a) => a.college_name === userCollege);

            filtered.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
            setAnnouncements(filtered);
          } else {
            setAnnouncements([]);
          }
        });
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <>
      <StudentNav />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-extrabold text-center text-gray-800 mb-6">
          📢 Latest Announcements
        </h1>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">#</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Title</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Priority</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {announcements.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center py-6 text-gray-500">
                      No announcements available.
                    </td>
                  </tr>
                ) : (
                  announcements.map((item, index) => (
                    <tr key={item.id} className="hover:bg-blue-50 transition">
                      <td className="px-6 py-4">{index + 1}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{item.title}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-block px-3 py-1 text-xs font-semibold rounded-full 
                            ${
                              item.priority === 'high'
                                ? 'bg-red-100 text-red-700'
                                : item.priority === 'medium'
                                ? 'bg-yellow-100 text-yellow-700'
                                : 'bg-green-100 text-green-700'
                            }`}
                        >
                          {item.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-700">
                        {item.timestamp
                          ? new Date(item.timestamp).toLocaleString()
                          : 'N/A'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentAnnouncements;
