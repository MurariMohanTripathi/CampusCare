import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ref, onValue, remove } from 'firebase/database';
import { db, auth } from '../firebase';
import Navbar from './StudentComponents/Navbar';

const ComplaintDetailPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleDelete = async (complaintId) => {
    const user = auth.currentUser;
    if (!user) {
      alert('You must be logged in to delete a complaint.');
      return;
    }

    const complaintRef = ref(db, `users/${user.uid}/complaints/${complaintId}`);

    try {
      await remove(complaintRef);
      setComplaints((prev) => prev.filter((c) => c.id !== complaintId));
      alert('Complaint deleted successfully.');
    } catch (error) {
      alert('Failed to delete complaint: ' + error.message);
    }
  };

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError('User not logged in');
      setLoading(false);
      return;
    }

    const complaintsRef = ref(db, `users/${user.uid}/complaints`);

    const unsubscribe = onValue(
      complaintsRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          const complaintList = Object.entries(data).map(([id, complaint]) => ({
            id,
            ...complaint,
          }));
          setComplaints(complaintList);
        } else {
          setComplaints([]);
        }
        setLoading(false);
      },
      (error) => {
        setError('Failed to fetch complaints: ' + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'resolved':
        return <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-semibold">Resolved</span>;
      case 'pending':
        return <span className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-xs font-semibold">Pending</span>;
      case 'rejected':
        return <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-semibold">Rejected</span>;
      default:
        return <span className="bg-gray-200 text-gray-700 px-2 py-1 rounded-full text-xs font-semibold capitalize">{status}</span>;
    }
  };

  return (
    <>
      <Navbar />

      <div className="max-w-5xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">📝 Your Complaints</h1>

        {loading && <p className="text-center text-gray-500">Loading complaints...</p>}
        {error && <p className="text-center text-red-600">{error}</p>}
        {!loading && complaints.length === 0 && (
          <div className="text-center text-gray-500 mt-10">
            <img
              src="https://cdn-icons-png.flaticon.com/512/463/463612.png"
              alt="No complaints"
              className="w-24 mx-auto opacity-70 mb-4"
            />
            <p>No complaints found.</p>
          </div>
        )}

        {!loading && complaints.length > 0 && (
          <div className="overflow-x-auto bg-white shadow-md rounded-xl">
            <table className="min-w-full divide-y divide-gray-200 text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">ID</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Subject</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Date</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 bg-white">
                {complaints.map((complaint) => (
                  <tr key={complaint.id} className="hover:bg-blue-50 transition">
                    <td className="px-6 py-4 text-blue-600 font-medium">
                      <Link to={`/complaints/${complaint.id}`}>{complaint.id}</Link>
                    </td>
                    <td className="px-6 py-4">{complaint.subject}</td>
                    <td className="px-6 py-4">{complaint.date}</td>
                    <td className="px-6 py-4">{getStatusBadge(complaint.status)}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this complaint?')) {
                            handleDelete(complaint.id);
                          }
                        }}
                        className="text-red-600 hover:text-red-800 font-medium transition"
                      >
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
    </>
  );
};

export default ComplaintDetailPage;
