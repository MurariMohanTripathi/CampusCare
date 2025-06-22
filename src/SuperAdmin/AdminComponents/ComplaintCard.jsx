import React from "react";

const STATUS_COLORS = {
  pending: "bg-yellow-100 text-yellow-800",
  "in-progress": "bg-blue-100 text-blue-800",
  resolved: "bg-green-100 text-green-800",
};

const ComplaintCard = ({ complaint, onStatusChange, onDelete }) => {
  return (
    <div className="bg-white border shadow-md rounded-xl p-5 space-y-3 hover:shadow-lg transition">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-gray-800 truncate">{complaint.subject}</h3>
        <span
          className={`px-3 py-1 text-sm rounded-full font-medium ${
            STATUS_COLORS[complaint.status] || "bg-gray-100 text-gray-700"
          }`}
        >
          {complaint.status}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        <span className="font-medium">From:</span> {complaint.name} ({complaint.roll})<br />
        <span className="font-medium">Email:</span> {complaint.email}<br />
        <span className="font-medium">Phone:</span> {complaint.phone}<br />
        <span className="font-medium">Date:</span> {complaint.date}<br />
        <span className="font-medium">Department:</span> {complaint.department}<br />
        <span className="font-medium">Priority:</span> {complaint.priority}
      </p>

      <p className="text-gray-700 text-sm whitespace-pre-line">
        <span className="font-semibold">Description:</span><br />
        {complaint.description}
      </p>

      <div className="flex justify-between items-center pt-2">
        <select
          value={complaint.status}
          onChange={(e) => onStatusChange(complaint.userId, complaint.complaintId, e.target.value)}
          className="px-3 py-1 border rounded-md text-sm"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>

        <button
          onClick={() => onDelete(complaint.userId, complaint.complaintId)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ComplaintCard;
