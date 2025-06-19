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

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

const truncateText = (text, maxLength = 40) => {
  if (!text) return "";
  return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
};

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
        <span className="ml-3 text-gray-700 text-lg">
          Loading complaints...
        </span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-full overflow-x-auto">
      <AdminComplaintCards stats={stats} />

      <h2 className="text-3xl font-semibold my-6 text-gray-800">
        All Student Complaints
      </h2>
      {complaints.length === 0 ? (
        <p className="text-center text-gray-600">No complaints found.</p>
      ) : (
        <table className="min-w-[900px] w-full border-collapse border border-gray-300 text-left">
          <thead className="bg-gray-100 sticky top-0">
            <tr>
              {[
                "Name",
                "Roll",
                "Dept.",
                "Email",
                "Subject",
                "Description",
                "Priority",
                "Date",
                "Status",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="border border-gray-300 px-3 py-2 text-gray-700 font-medium select-none"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {complaints.map((comp, idx) => (
              <tr
                key={comp.complaintId + idx}
                className="hover:bg-gray-50 even:bg-white odd:bg-gray-50"
                title={comp.description}
              >
                <td className="border border-gray-300 px-3 py-1 max-w-[130px] truncate">
                  {comp.name}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  {comp.roll}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  {comp.department}
                </td>
                <td className="border border-gray-300 px-3 py-1 max-w-[180px] truncate">
                  {comp.email}
                </td>
                <td className="border border-gray-300 px-3 py-1 max-w-[160px] truncate">
                  {comp.subject}
                </td>
                <td
                  className="border border-gray-300 px-3 py-1 max-w-[250px] truncate cursor-help"
                  title={comp.description}
                >
                  {truncateText(comp.description, 60)}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  {comp.priority}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  {comp.date}
                </td>
                <td className="border border-gray-300 px-3 py-1">
                  <select
                    value={comp.status}
                    onChange={(e) =>
                      handleStatusChange(
                        comp.userId,
                        comp.complaintId,
                        e.target.value
                      )
                    }
                    className={`px-2 py-1 rounded border border-gray-300 text-sm font-semibold ${
                      STATUS_COLORS[comp.status] || "bg-gray-100 text-gray-700"
                    }`}
                  >
                    <option value="pending">Pending</option>
                    <option value="in-progress">In Progress</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </td>
                <td className="border border-gray-300 px-3 py-1 text-center">
                  <button
                    onClick={() => handleDelete(comp.userId, comp.complaintId)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition"
                    aria-label={`Delete complaint ${comp.subject}`}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AllComplaints;
