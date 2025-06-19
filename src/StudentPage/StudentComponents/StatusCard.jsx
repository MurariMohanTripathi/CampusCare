import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { auth } from "../../firebase"; // Adjust path based on your folder structure

const StatusCard = () => {
  const [statusCounts, setStatusCounts] = useState({
    pending: 0,
    inProgress: 0,
    resolved: 0,
  });

  useEffect(() => {
    const fetchStatusCounts = async () => {
      const db = getDatabase();
      const dbRef = ref(db);

      const currentUser = auth.currentUser;
      if (!currentUser) return;

      try {
        const snapshot = await get(child(dbRef, `users/${currentUser.uid}/complaints`));
        if (snapshot.exists()) {
          const complaints = snapshot.val();

          let pending = 0;
          let inProgress = 0;
          let resolved = 0;

          Object.values(complaints).forEach((complaint) => {
            switch (complaint.status) {
              case "pending":
                pending++;
                break;
              case "in-progress":
                inProgress++;
                break;
              case "resolved":
                resolved++;
                break;
              default:
                break;
            }
          });

          setStatusCounts({ pending, inProgress, resolved });
        }
      } catch (err) {
        console.error("Error fetching student complaint status:", err);
      }
    };

    fetchStatusCounts();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 xl:px-20">
      {/* Card 1 - Pending */}
      <div className="bg-blue-500 text-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold">{statusCounts.pending}</h1>
        <p className="mt-2 text-lg font-medium">Pending</p>
      </div>

      {/* Card 2 - In Progress */}
      <div className="bg-yellow-500 text-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold">{statusCounts.inProgress}</h1>
        <p className="mt-2 text-lg font-medium">In Progress</p>
      </div>

      {/* Card 3 - Resolved */}
      <div className="bg-green-500 text-white rounded-2xl shadow-md p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300">
        <h1 className="text-4xl font-bold">{statusCounts.resolved}</h1>
        <p className="mt-2 text-lg font-medium">Resolved</p>
      </div>
    </div>
  );
};

export default StatusCard;
