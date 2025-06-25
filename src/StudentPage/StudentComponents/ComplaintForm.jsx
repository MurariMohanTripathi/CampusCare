import React, { useState, useEffect } from 'react';
import { ref, push } from 'firebase/database';
import { db, auth } from '../../firebase';
import { X } from 'lucide-react'; // Optional for close icon

const ComplaintForm = ({ onClose }) => {
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  const past7Date = new Date();
  past7Date.setDate(today.getDate() - 6);
  const past7Str = past7Date.toISOString().split("T")[0];

  const [formData, setFormData] = useState({
    name: '',
    roll: '',
    email: '',
    phone: '',
    department: 'Computer Science',
    date: '',
    subject: '',
    description: '',
    priority: 'Low priority',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setFormData((prev) => ({ ...prev, email: user.email || '' }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const user = auth.currentUser;
    if (!user) {
      setError('User not logged in');
      return;
    }

    try {
      const complaintData = {
        ...formData,
        status: 'pending',
        timestamp: new Date().toISOString(),
      };

      await push(ref(db, `users/${user.uid}/complaints`), complaintData);
      setSuccess('Complaint submitted successfully!');
      setFormData({
        name: '',
        roll: '',
        email: user.email || '',
        phone: '',
        department: 'Computer Science',
        date: '',
        subject: '',
        description: '',
        priority: 'Low priority',
      });
    } catch (err) {
      setError('Failed to submit complaint: ' + err.message);
    }
  };

  return (
    <div className="relative bg-white  rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6">
      {/* Close button */}
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-lg"
        >
          <X />
        </button>
      )}

      <h2 className="text-2xl font-bold text-center text-blue-700 mb-6">Complaint Form</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Text fields */}
        {[
          { label: 'Name', name: 'name', type: 'text', placeholder: "Enter your full name" },
          { label: 'Roll Number', name: 'roll', type: 'number', placeholder: "Enter your roll number" },
          { label: 'Phone', name: 'phone', type: 'tel', placeholder: "Enter your phone number", maxLength: 10 },
          { label: 'Date', name: 'date', type: 'date' },
          { label: 'Subject', name: 'subject', type: 'text', placeholder: "Short title of your complaint" },
        ].map(({ label, name, type, placeholder, maxLength }) => (
          <div key={name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">{label}</label>
            <input
              type={type}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              placeholder={placeholder}
              maxLength={maxLength}
              min={name === "date" ? past7Str : undefined}
              max={name === "date" ? todayStr : undefined}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        ))}

        {/* Email */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            readOnly
            className="w-full px-4 py-2 text-center text-red-600 border border-gray-300 rounded-md bg-gray-100"
          />
        </div>

        {/* Department */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            {['Computer Science', 'Electrical', 'Mechanical', 'Commerce', 'Arts & wellbeing', 'Law', 'Hostel', 'Library'].map((dept) => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Explain the issue in detail"
            required
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none"
          />
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Priority</label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm"
          >
            <option value="Low priority">Low</option>
            <option value="Medium priority">Medium</option>
            <option value="High priority">High</option>
          </select>
        </div>

        {/* Attachment */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Attachment (not implemented)</label>
          <input
            type="file"
            disabled
            title="Attachment functionality not available yet"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100 text-gray-500"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-bold rounded-lg transition duration-200"
        >
          Submit Complaint
        </button>

        {/* Feedback */}
        {error && <p className="text-red-600 text-center mt-2">{error}</p>}
        {success && <p className="text-green-600 text-center mt-2">{success}</p>}
      </form>
    </div>
  );
};

export default ComplaintForm;
