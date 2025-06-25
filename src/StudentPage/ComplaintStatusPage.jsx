import React, { useEffect, useState } from "react";
import { ref, onValue } from "firebase/database";
import { db, auth } from "../firebase";

const ComplaintStatusPage = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setError("User not logged in");
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
        setError("Failed to fetch complaints: " + error.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  if (loading) return <p className="text-center mt-10 text-gray-500">Loading complaints...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;
  if (complaints.length === 0) return <div className="mt-6 text-center text-gray-500">No complaints found.</div>;

  return (
    <div className="mt-10 bg-white shadow-xl rounded-2xl ring-1 ring-gray-200 overflow-hidden">
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm sm:text-base border-separate border-spacing-y-3">
      <thead className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <tr>
          <th className="px-6 py-4 rounded-l-xl text-left font-semibold tracking-wider">ID</th>
          <th className="px-6 py-4 text-left font-semibold tracking-wider">Subject</th>
          <th className="px-6 py-4 text-left font-semibold tracking-wider">Date</th>
          <th className="px-6 py-4 rounded-r-xl text-left font-semibold tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody>
        {complaints.map(({ id, subject, date, status }) => {
          const d = date ? new Date(date) : null;
          const formattedDate = d
            ? d.toLocaleDateString(undefined, {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              })
            : 'No Date';

          const statusStyle = {
            resolved: 'bg-green-100 text-green-700 border-green-300',
            'In Progress': 'bg-yellow-100 text-yellow-800 border-yellow-300 animate-pulse',
            pending: 'bg-red-100 text-red-700 border-red-300',
          };

          return (
            <tr
              key={id}
              className="bg-gray-50 hover:bg-cyan-50 transition-all duration-200 rounded-xl shadow-sm"
            >
              <td className="px-6 py-3 font-medium text-gray-800">{id}</td>
              <td className="px-6 py-3 text-gray-700">{subject || 'No Title'}</td>
              <td className="px-6 py-3 text-gray-500">{formattedDate}</td>
              <td className="px-6 py-3">
                <span
                  className={`px-3 py-1 inline-block text-xs font-semibold border rounded-full ${statusStyle[status] || statusStyle['pending']}`}
                >
                  {status}
                </span>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </div>
</div>
  );
};

export default ComplaintStatusPage;
