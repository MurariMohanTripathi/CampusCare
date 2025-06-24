import React, { useEffect, useState } from "react";
import { getDatabase, ref, get, child, update, remove } from "firebase/database";
import { auth } from "../../firebase";
import ComplaintCard from "../../SuperAdmin/AdminComponents/ComplaintCard";
import AdminComplaintCards from "../../SuperAdmin/AdminComponents/AdminComplaintCards";
import DepNavbar from "./DepNav";
const DepartmentComplaints = () => {
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
      if (!currentUser) return;

      const adminSnap = await get(child(dbRef, `users/${currentUser.uid}`));
      const adminData = adminSnap.val();

      const adminCollege = adminData?.college_name;
      const adminDept = adminData?.department;

      if (!adminCollege || !adminDept) return;

      const usersSnap = await get(child(dbRef, "users"));
      const users = usersSnap.val();

      const todayDate = new Date().toISOString().split("T")[0];
      let filteredComplaints = [];
      let pending = 0, urgent = 0, today = 0;

      for (let uid in users) {
        const user = users[uid];

        // Only students from same college
        if (user.college_name === adminCollege && user.complaints) {
          const complaints = user.complaints;

          for (let cid in complaints) {
            const complaint = complaints[cid];

            // ✅ Match complaint.department with admin.department
            if (complaint.department === adminDept) {
              filteredComplaints.push({ ...complaint, userId: uid, complaintId: cid });

              if (complaint.status === "pending") pending++;
              if (complaint.priority === "High priority") urgent++;
              if (complaint.date === todayDate) today++;
            }
          }
        }
      }

      setComplaints(filteredComplaints);
      setStats({
        total: filteredComplaints.length,
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
    try {
      await update(ref(db, `users/${userId}/complaints/${complaintId}`), { status: newStatus });
      fetchComplaints();
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleDelete = async (userId, complaintId) => {
    const confirm = window.confirm("Are you sure you want to delete this complaint?");
    if (!confirm) return;

    const db = getDatabase();
    try {
      await remove(ref(db, `users/${userId}/complaints/${complaintId}`));
      fetchComplaints();
    } catch (err) {
      console.error("Failed to delete complaint:", err);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-lg font-medium text-gray-600">Loading complaints...</p>
      </div>
    );
  }

  return (
    <>
    <DepNavbar />
    <div className="p-6 max-w-7xl mx-auto">
      <AdminComplaintCards stats={stats} />
      <h2 className="text-3xl font-semibold my-6 text-gray-800">Department Complaints</h2>
      {complaints.length === 0 ? (
        <p className="text-center text-gray-500">No complaints found for your department.</p>
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
    </>
  );
};

export default DepartmentComplaints;
