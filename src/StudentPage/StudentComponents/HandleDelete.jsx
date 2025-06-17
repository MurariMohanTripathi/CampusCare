import { ref, remove } from 'firebase/database';

// inside your ComplaintDetailPage component:

const handleDelete = async (complaintId) => {
  const user = auth.currentUser;
  if (!user) {
    alert('You must be logged in to delete a complaint.');
    return;
  }

  const complaintRef = ref(db, `users/${user.uid}/complaints/${complaintId}`);

  try {
    await remove(complaintRef);
    setComplaints(prev => prev.filter(c => c.id !== complaintId));
    alert('Complaint deleted successfully.');
  } catch (error) {
    alert('Failed to delete complaint: ' + error.message);
  }
};
