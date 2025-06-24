import React, { useEffect, useState } from "react";
import { ref, get, remove } from "firebase/database";
import { auth, db } from "../../firebase";
import AdminNav from "./AdminNav";

const DepartmentAdminList = () => {
  const [admins, setAdmins] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [collegeName, setCollegeName] = useState("");

  useEffect(() => {
    const fetchAdmins = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to view department admins.");
        setLoading(false);
        return;
      }

      try {
        const currentUserRef = ref(db, `users/${user.uid}`);
        const snapshot = await get(currentUserRef);
        if (!snapshot.exists()) {
          setError("User data not found.");
          setLoading(false);
          return;
        }

        const currentUserData = snapshot.val();
        if (currentUserData.type !== "SuperAdmin") {
          setError("Access denied. Only SuperAdmins can view department admins.");
          setLoading(false);
          return;
        }

        setCollegeName(currentUserData.college_name);

        const allUsersRef = ref(db, "users");
        const usersSnapshot = await get(allUsersRef);
        if (usersSnapshot.exists()) {
          const data = usersSnapshot.val();
          const deptAdmins = Object.entries(data)
            .filter(
              ([_, user]) =>
                user.type === "DepartmentAdmin" &&
                user.college_name === currentUserData.college_name
            )
            .map(([uid, user]) => ({
              uid,
              ...user,
            }));
          setAdmins(deptAdmins);
        }
      } catch (err) {
        setError("Failed to fetch department admins: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleDelete = async (uid) => {
    if (window.confirm("Are you sure you want to delete this Department Admin?")) {
      try {
        await remove(ref(db, `users/${uid}`));
        setAdmins((prev) => prev.filter((admin) => admin.uid !== uid));
      } catch (err) {
        setError("Failed to delete admin: " + err.message);
      }
    }
  };

  return (
    <>
    <AdminNav />
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-center text-indigo-700 mb-4">
        Department Admins - {collegeName}
      </h2>

      {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : admins.length === 0 ? (
        <p className="text-center text-gray-600">No Department Admins found.</p>
      ) : (
        <div className="space-y-4">
          {admins.map((admin) => (
            <div
              key={admin.uid}
              className="border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">{admin.email}</p>
                <p className="text-sm text-gray-500">
                  Dept: {admin.department} | Phone: {admin.phone}
                </p>
              </div>
              <button
                onClick={() => handleDelete(admin.uid)}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default DepartmentAdminList;
