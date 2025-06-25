// components/ComplaintCardModal.jsx
import React, { useState } from 'react';
import { X, Pencil } from 'lucide-react';
import { db, auth } from '../../firebase'; // update path as needed
import { ref, update } from 'firebase/database';

const ComplaintCardModal = ({ isOpen, onClose, complaint }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({
    subject: complaint?.subject || '',
    description: complaint?.description || '',
    priority: complaint?.priority || '',
  });

  if (!isOpen || !complaint) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return alert("User not logged in");

    const complaintRef = ref(db, `users/${user.uid}/complaints/${complaint.id}`);
    try {
      await update(complaintRef, form);
      alert("Complaint updated successfully.");
      setIsEditing(false);
      onClose(); // optional: close after update
    } catch (err) {
      alert("Error updating complaint: " + err.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-30 flex justify-center items-center">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-black"
        >
          <X size={20} />
        </button>

        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Complaint Details</h2>
          {complaint.status === 'pending' && !isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-1 text-sm text-blue-600 hover:underline"
            >
              <Pencil size={16} />
              Edit
            </button>
          )}
        </div>

        {!isEditing ? (
          <div className="space-y-3">
            <p><strong>ID:</strong> {complaint.id}</p>
            <p><strong>Subject:</strong> {form.subject}</p>
            <p><strong>Date:</strong> {complaint.date}</p>
            <p><strong>Status:</strong> <span className="capitalize">{complaint.status}</span></p>
            <p><strong>Description:</strong> {form.description || 'No description provided'}</p>
            <p><strong>Department:</strong> {complaint.department || 'N/A'}</p>
            <p><strong>Priority:</strong> {form.priority || 'N/A'}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Subject</label>
              <input
                name="subject"
                value={form.subject}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
                rows={4}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Priority</label>
              <select
                name="priority"
                value={form.priority}
                onChange={handleChange}
                className="w-full border rounded-md px-3 py-2 mt-1"
              >
                <option value="">Select priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <button
                onClick={() => setIsEditing(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Changes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintCardModal;
