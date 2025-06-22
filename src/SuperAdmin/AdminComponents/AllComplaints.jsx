import React, { useEffect, useState } from "react";
import {
  getDatabase,
  ref,
  get,
  child,
  update,
  remove,
} from "firebase/database";
import { auth } from "../../firebase";
import AdminComplaintCards from "../AdminComponents/AdminComplaintCards";
import ComplaintCard from "../AdminComponents/ComplaintCard"; // New card component

const AllComplaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    urgent: 0,
    today: 0,
  });

  const fetchComplaints = async () => {
    const db = getDatabase();
    const dbRef = ref(db);

    try {
      const currentUser = auth.currentUser;
      if (!currentUser) {
        console.error("No user logged in");
        setLoading(false);
        return;
      }

      const superAdminSnap = await get(
        child(dbRef, `users/${currentUser.uid}`)
      );
      const superAdminCollege = superAdminSnap.val()?.college_name;

      if (!superAdminCollege) {
        console.error("SuperAdmin college not found.");
        setLoading(false);
        return;
      }

      const snapshot = await get(child(dbRef, "users"));
      const allComplaints = [];
      let pending = 0,
        urgent = 0,
        today = 0;
      const todayDate = new Date().toISOString().split("T")[0];

      if (snapshot.exists()) {
        const usersData = snapshot.val();

        Object.keys(usersData).forEach((userId) => {
          const user = usersData[userId];

          if (user.college_name === superAdminCollege && user.complaints) {
            Object.keys(user.complaints).forEach((complaintId) => {
              const complaint = user.complaints[complaintId];
              allComplaints.push({
                ...complaint,
                complaintId,
                userId,
              });

              if (complaint.status === "pending") pending++;
              if (complaint.priority === "High priority") urgent++;
              if (complaint.date === todayDate) today++;
            });
          }
        });
      }

      setComplaints(allComplaints);
      setStats({
        total: allComplaints.length,
        pending,
        urgent,
        today,
      });
    } catch (error) {
      console.error("Error fetching complaints:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleStatusChange = async (userId, complaintId, newStatus) => {
    const db = getDatabase();
    const complaintRef = ref(db, `users/${userId}/complaints/${complaintId}`);
    try {
      await update(complaintRef, { status: newStatus });
      fetchComplaints();
    } catch (error) {
      console.error("Failed to update status:", error);
    }
  };

  const handleDelete = async (userId, complaintId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this complaint?"
    );
    if (!confirmDelete) return;

    const db = getDatabase();
    const complaintRef = ref(db, `users/${userId}/complaints/${complaintId}`);
    try {
      await remove(complaintRef);
      fetchComplaints();
    } catch (error) {
      console.error("Failed to delete complaint:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <svg
          className="animate-spin h-10 w-10 text-blue-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span className="ml-3 text-gray-700 text-lg">Loading complaints...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <AdminComplaintCards stats={stats} />

      <h2 className="text-3xl font-semibold my-6 text-gray-800">
        All Student Complaints
      </h2>

      {complaints.length === 0 ? (
        <p className="text-center text-gray-600">No complaints found.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {complaints.map((comp, idx) => (
            <ComplaintCard
              key={comp.complaintId + idx}
              complaint={comp}
              onStatusChange={handleStatusChange}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllComplaints;
