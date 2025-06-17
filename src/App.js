import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getDatabase, ref, get, child } from 'firebase/database';

// Pages & Components
import HomePage from './StudentPage/Homepage';
import ComplaintForm from './StudentPage/StudentComponents/ComplaintForm';
import LoginPage from './pages/LoginPage';
import About from './StudentPage/About';
import HomepageAdmin from './SuperAdmin/HomepageAdmin';
import SuperAdminAnnouncement from './SuperAdmin/AdminPages/SuperAdminAnnouncement';
import SuperAdminAbout from './SuperAdmin/AdminPages/SuperAdminAbout';
import LandingPage from './pages/LandingPage';
import StudentAnnouncement from './StudentPage/StudentAnnouncements';
import ProfilePage from './StudentPage/ProfilePage';
import AdminProfile from './SuperAdmin/AdminPages/AdminProfile';
import SignUp from './pages/SignUp';
import ComplaintDetailPage from './StudentPage/ComplaintDetailPage';
import ProtectedRoute from './component/ProtectedRoute'; // ✅ Correct import
import Unauthorized from './pages/Unauthorized'; // ✅ Optional page
import AnnouncementForm from './SuperAdmin/AdminComponents/AnnouncementForm';
import SuperAdminServices from './SuperAdmin/AdminPages/SuperAdminServices';

const App = () => {
  const [userRole, setUserRole] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const dbRef = ref(db);
        try {
          const snapshot = await get(child(dbRef, `users/${user.uid}/type`));
          if (snapshot.exists()) {
            setUserRole(snapshot.val()); // "student" or "SuperAdmin"
          } else {
            setUserRole(null);
          }
        } catch (error) {
          console.error("Failed to fetch role:", error);
          setUserRole(null);
        }
      } else {
        setUserRole(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <Routes>
      {/* Public Routes */}
      <Route path='/' element={<LandingPage />} />
      <Route path='/Login' element={<LoginPage />} />
      <Route path='/SignUp' element={<SignUp />} />
      <Route path='/unauthorized' element={<Unauthorized />} />

      {/* Student-only Routes */}
      <Route
        path='/Homepage'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['student']}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/ComplaintForm'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['student']}>
            <ComplaintForm />
          </ProtectedRoute>
        }
      />
      <Route
        path='/About'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['student']}>
            <About />
          </ProtectedRoute>
        }
      />
      <Route
        path='/StudentAnnouncements'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['student']}>
            <StudentAnnouncement />
          </ProtectedRoute>
        }
      />
      <Route
        path='/ProfilePage'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['student']}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path='/ComplaintDetailPage'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['student']}>
            <ComplaintDetailPage />
          </ProtectedRoute>
        }
      />

      {/* SuperAdmin-only Routes */}
      <Route
        path='/HomepageAdmin'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['SuperAdmin']}>
            <HomepageAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path='/SuperAdminAnnouncement'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['SuperAdmin']}>
            <SuperAdminAnnouncement />
          </ProtectedRoute>
        }
      />
      <Route
        path='/SuperAdminAbout'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['SuperAdmin']}>
            <SuperAdminAbout />
          </ProtectedRoute>
        }
      />
      <Route
        path='/AdminProfile'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['SuperAdmin']}>
            <AdminProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path='/AnnouncementForm'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['SuperAdmin']}>
            <AnnouncementForm />
          </ProtectedRoute>
        }
      />
      <Route
        path='/Services'
        element={
          <ProtectedRoute role={userRole} allowedRoles={['SuperAdmin']}>
            <SuperAdminServices />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
