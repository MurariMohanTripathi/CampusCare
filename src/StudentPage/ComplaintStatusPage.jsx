import React, { useEffect, useState } from 'react';
import { ref, onValue } from 'firebase/database';
import { db, auth } from '../firebase';
import ComplainCard from './StudentComponents/ComplainCard'

const ComplaintStatusPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

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

  if (loading) return <p className="text-center mt-10">Loading complaints...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (complaints.length === 0) return <p className="text-center mt-10"><ComplainCard /></p>;

  return (
   <>
  <ComplainCard />

  <div className="w-full px-4 sm:px-6 lg:px-12 mt-10">
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden overflow-x-auto">
      <table className="min-w-full table-auto border-separate border-spacing-y-2 text-sm sm:text-base">
        <thead className="bg-cyan-500 text-white">
          <tr>
            <th className="px-6 py-3 text-left font-semibold">ID</th>
            <th className="px-6 py-3 text-left font-semibold">Title</th>
            <th className="px-6 py-3 text-left font-semibold">Date</th>
            <th className="px-6 py-3 text-left font-semibold">Status</th>
          </tr>
        </thead>
        <tbody>
          {complaints.map(({ id, subject, date, status }) => {
            const d = date ? new Date(date) : null;
            const formattedDate = d
              ? d.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })
              : "No Date";

            return (
              <tr
                key={id}
                className="bg-gray-50 hover:bg-cyan-50 transition duration-200 rounded-lg shadow-sm"
              >
                <td className="px-6 py-3">{id}</td>
                <td className="px-6 py-3">{subject || "No Title"}</td>
                <td className="px-6 py-3">{formattedDate}</td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      status === "Resolved"
                        ? "bg-green-100 text-green-700"
                        : status === "In Progress"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {status || "Pending"}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</>

  );
};

export default ComplaintStatusPage;
