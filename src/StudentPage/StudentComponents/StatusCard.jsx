import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get } from "firebase/database";
import { auth } from "../../firebase";
import { Clock, CheckCircle, LoaderCircle } from "lucide-react"; // Optional: Install lucide-react

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

  const cardData = [
    {
      title: "Pending",
      count: statusCounts.pending,
      color: "from-blue-400 to-blue-600",
      icon: <Clock className="w-8 h-8 text-white" />,
    },
    {
      title: "In Progress",
      count: statusCounts.inProgress,
      color: "from-yellow-400 to-yellow-600",
      icon: <LoaderCircle className="w-8 h-8 text-white animate-spin-3" />,
    },
    {
      title: "Resolved",
      count: statusCounts.resolved,
      color: "from-green-400 to-green-600",
      icon: <CheckCircle className="w-8 h-8 text-white" />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 px-4 xl:px-20">
      {cardData.map(({ title, count, color, icon }) => (
        <div
          key={title}
          className={`bg-gradient-to-br ${color} text-white rounded-2xl shadow-xl p-6 flex flex-col items-center justify-center hover:scale-105 transition-transform duration-300 backdrop-blur-md`}
        >
          <div className="mb-3">{icon}</div>
          <h1 className="text-4xl font-extrabold">{count}</h1>
          <p className="mt-1 text-lg tracking-wide font-medium">{title}</p>
        </div>
      ))}
    </div>
  );
};

export default StatusCard;
