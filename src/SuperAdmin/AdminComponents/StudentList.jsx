import React, { useEffect, useState } from "react";
import { ref, get, remove } from "firebase/database";
import { auth, db } from "../../firebase";
import AdminNav from "./AdminNav";
const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [collegeName, setCollegeName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) {
        setError("You must be logged in to view students.");
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
          setError("Access denied. Only SuperAdmins can view students.");
          setLoading(false);
          return;
        }

        setCollegeName(currentUserData.college_name);

        const allUsersRef = ref(db, "users");
        const usersSnapshot = await get(allUsersRef);
        if (usersSnapshot.exists()) {
          const data = usersSnapshot.val();
          const studentUsers = Object.entries(data)
            .filter(
              ([_, user]) =>
                user.type === "student" &&
                user.college_name === currentUserData.college_name
            )
            .map(([uid, user]) => ({
              uid,
              ...user,
            }));
          setStudents(studentUsers);
        }
      } catch (err) {
        setError("Failed to fetch students: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (uid) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await remove(ref(db, `users/${uid}`));
        setStudents((prev) => prev.filter((student) => student.uid !== uid));
      } catch (err) {
        setError("Failed to delete student: " + err.message);
      }
    }
  };

  return (
    <>
    <AdminNav />
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-lg mt-6">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
        Registered Students - {collegeName}
      </h2>

      {error && <p className="text-red-600 text-sm mb-3 text-center">{error}</p>}
      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : students.length === 0 ? (
        <p className="text-center text-gray-600">No students found.</p>
      ) : (
        <div className="space-y-4">
          {students.map((student) => (
            <div
              key={student.uid}
              className="border border-gray-200 p-4 rounded-lg shadow-sm flex justify-between items-center"
            >
              <div>
                <p className="text-lg font-semibold text-gray-800">{student.email}</p>
                <p className="text-sm text-gray-500">
                  Name: {student.name || "N/A"} | Roll: {student.roll || "N/A"}
                </p>
              </div>
              <button
                onClick={() => handleDelete(student.uid)}
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

export default StudentList;
