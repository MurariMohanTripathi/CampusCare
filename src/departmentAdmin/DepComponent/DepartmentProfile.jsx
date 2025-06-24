import React, { useEffect, useState } from 'react';
import { auth, db } from '../../firebase';
import { get, ref, update } from 'firebase/database';
import { X } from 'lucide-react';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const DepartmentProfile = ({ onClose }) => {
  const [userData, setUserData] = useState(null);
  const [editable, setEditable] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (err) {
      setError('Sign out failed. Please try again.');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const user = auth.currentUser;
      if (!user) {
        setError('User not logged in');
        return;
      }

      try {
        const snapshot = await get(ref(db, `users/${user.uid}`));
        if (snapshot.exists()) {
          setUserData(snapshot.val());
        } else {
          setError('User data not found');
        }
      } catch (err) {
        setError('Error fetching user data');
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) return;

    try {
      await update(ref(db, `users/${user.uid}`), {
        phone: userData.phone,
        department: userData.department,
      });
      setSuccess('Profile updated successfully!');
      setEditable(false);
    } catch (err) {
      setError('Failed to update profile');
    }
  };

  if (!userData) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 sm:px-6">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-8 sm:p-10 animate-fadeIn">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          title="Close"
        >
          <X size={22} />
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-8">
          Department Profile
        </h2>

        {/* Divider */}
        <div className="border-b border-gray-200 mb-6"></div>

        {/* Form */}
        <form className="space-y-5">
          {[
            { label: 'Email Address', name: 'email', value: userData.email, disabled: true },
            { label: 'Phone Number', name: 'phone', value: userData.phone, editable: true },
            { label: 'Department', name: 'department', value: userData.department, editable: true },
            { label: 'College Name', name: 'college_name', value: userData.college_name, disabled: true },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                {field.label}
              </label>
              <input
                type="text"
                name={field.name}
                value={field.value}
                onChange={handleChange}
                disabled={!editable || field.disabled}
                className={`w-full px-4 py-2.5 rounded-lg border transition-all duration-200 text-sm ${
                  field.disabled || (!editable && !field.editable)
                    ? 'bg-gray-100 border-gray-300 text-gray-600 cursor-not-allowed'
                    : 'border-indigo-500 focus:ring-2 focus:ring-indigo-400'
                }`}
              />
            </div>
          ))}

          {/* Feedback Messages */}
          {error && <p className="text-sm text-red-600 font-medium">{error}</p>}
          {success && <p className="text-sm text-green-600 font-medium">{success}</p>}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row sm:justify-between gap-4 pt-6 border-t mt-8">
            <div className="flex gap-3">
              {!editable ? (
                <button
                  type="button"
                  onClick={() => {
                    setEditable(true);
                    setError('');
                    setSuccess('');
                  }}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow transition"
                >
                  Edit Info
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSave}
                  className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg text-sm font-semibold shadow transition"
                >
                  Save Changes
                </button>
              )}

              <button
                type="button"
                onClick={onClose}
                className="text-sm text-gray-500 hover:text-gray-800 underline transition"
              >
                Cancel
              </button>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              className="text-sm text-red-600 hover:text-red-700 font-semibold underline transition self-start sm:self-center"
            >
              Sign Out
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DepartmentProfile;
