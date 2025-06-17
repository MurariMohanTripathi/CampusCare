import React, { useEffect, useState } from 'react';
import AdminNav from '../AdminComponents/AdminNav';
import { db, auth } from '../../firebase';
import { ref, onValue, remove } from 'firebase/database';
import { Pencil, Trash2, Plus } from 'lucide-react';
import AnnouncementForm from '../AdminComponents/AnnouncementForm';

const SuperAdminAnnouncement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const currentUser = auth.currentUser;

  useEffect(() => {
    if (!currentUser) return;

    const announcementsRef = ref(db, 'announcements');
    const unsubscribe = onValue(announcementsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const filtered = Object.entries(data)
          .filter(([_, a]) => a.createdBy === currentUser.uid)
          .map(([id, a]) => ({ id, ...a }));
        setAnnouncements(filtered);
      } else {
        setAnnouncements([]);
      }
    });

    return () => unsubscribe();
  }, [currentUser]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this announcement?')) {
      remove(ref(db, `announcements/${id}`)).catch((err) =>
        alert('Failed to delete: ' + err.message)
      );
    }
  };

  const renderPriorityBadge = (priority) => {
    const base = 'text-xs px-3 py-1 rounded-full font-semibold shadow-sm';
    switch (priority.toLowerCase()) {
      case 'high': return <span className={`${base} bg-red-100 text-red-700`}>High</span>;
      case 'medium': return <span className={`${base} bg-yellow-100 text-yellow-700`}>Medium</span>;
      case 'low': return <span className={`${base} bg-green-100 text-green-700`}>Low</span>;
      default: return <span className={`${base} bg-gray-200 text-gray-700`}>{priority}</span>;
    }
  };

  return (
    <>
      <AdminNav />
      <div className="min-h-screen bg-gradient-to-br from-amber-100 to-blue-200 py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto bg-gradient-to-br from-blue-50 to-amber-50 rounded-2xl shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 sm:p-10">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h1 className="text-3xl font-bold text-gray-800 drop-shadow-sm">📢 Manage Announcements</h1>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <Plus className="w-4 h-4" />
              Add New
            </button>
          </div>

          {announcements.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <p>No announcements created yet.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border border-gray-200 bg-white rounded-md overflow-hidden shadow-sm">
                <thead className="bg-gray-100 text-gray-700 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="px-4 py-3 border text-left">Sr. No</th>
                    <th className="px-4 py-3 border text-left">Title</th>
                    <th className="px-4 py-3 border text-left">Priority</th>
                    <th className="px-4 py-3 border text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {announcements.map((item, index) => (
                    <tr key={item.id} className="hover:bg-blue-50 transition duration-200">
                      <td className="px-4 py-2 border text-center">{index + 1}</td>
                      <td className="px-4 py-2 border font-medium text-gray-800">{item.title}</td>
                      <td className="px-4 py-2 border">{renderPriorityBadge(item.priority)}</td>
                      <td className="px-4 py-2 border text-center flex flex-wrap justify-center gap-2">
                        <button
                          onClick={() => alert("Editing coming soon")}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-400 text-black rounded-md hover:bg-yellow-300 transition shadow hover:shadow-md"
                        >
                          <Pencil className="w-4 h-4" />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="inline-flex items-center gap-1 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-400 transition shadow hover:shadow-md"
                        >
                          <Trash2 className="w-4 h-4" />
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal for AnnouncementForm */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-start pt-24 px-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-xl w-full p-6 relative animate-fade-in">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl"
            >
              &times;
            </button>
            <AnnouncementForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default SuperAdminAnnouncement;
