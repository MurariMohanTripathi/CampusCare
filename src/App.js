import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";

// Pages & Components
import HomePage from "./StudentPage/Homepage";
import ComplaintForm from "./StudentPage/StudentComponents/ComplaintForm";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import HomepageAdmin from "./SuperAdmin/HomepageAdmin";
import SuperAdminAnnouncement from "./SuperAdmin/AdminPages/SuperAdminAnnouncement";
import LandingPage from "./pages/LandingPage";
import StudentAnnouncement from "./StudentPage/StudentAnnouncements";
import ProfilePage from "./StudentPage/ProfilePage";
import AdminProfile from "./SuperAdmin/AdminPages/AdminProfile";
import SignUp from "./pages/SignUp";
import ComplaintDetailPage from "./StudentPage/ComplaintDetailPage";
import ProtectedRoute from "./component/ProtectedRoute"; // ✅ Correct import
import Unauthorized from "./pages/Unauthorized"; // ✅ Optional page
import AnnouncementForm from "./SuperAdmin/AdminComponents/AnnouncementForm";
import SuperAdminServices from "./SuperAdmin/AdminPages/SuperAdminServices";
import HomepageDAdmin from "./departmentAdmin/HomepageDAdmin";
import ControlCenter from "./SuperAdmin/AdminPages/ControlCenter";
import DepartmentAdminList from "./SuperAdmin/AdminComponents/DepartmentAdminList";
import StudentList from "./SuperAdmin/AdminComponents/StudentList";
import DepartmentComplaints from "./departmentAdmin/DepComponent/DepartmentComplaints";
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
      <Route path="/" element={<LandingPage />} />
      <Route path="/Login" element={<LoginPage />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      {/* Student-only Routes */}
      <Route
        path="/Homepage"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["student"]}>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ComplaintForm"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["student"]}>
            <ComplaintForm />
          </ProtectedRoute>
        }
      />
      <Route path="/About" element={<About />} />
      <Route
        path="/StudentAnnouncements"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["student"]}>
            <StudentAnnouncement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ProfilePage"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["student"]}>
            <ProfilePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/ComplaintDetailPage"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["student"]}>
            <ComplaintDetailPage />
          </ProtectedRoute>
        }
      />

      {/* SuperAdmin-only Routes */}
      <Route
        path="/HomepageAdmin"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["SuperAdmin"]}>
            <HomepageAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/SuperAdminAnnouncement"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["SuperAdmin"]}>
            <SuperAdminAnnouncement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/DepartmentAdminList"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["SuperAdmin"]}>
            <DepartmentAdminList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Controls"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["SuperAdmin"]}>
            <ControlCenter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AdminProfile"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["SuperAdmin"]}>
            <AdminProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/AnnouncementForm"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["SuperAdmin"]}>
            <AnnouncementForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/StudentList"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["SuperAdmin"]}>
            <StudentList />
          </ProtectedRoute>
        }
      />
      <Route
        path="/Services"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["SuperAdmin"]}>
            <SuperAdminServices />
          </ProtectedRoute>
        }
      />
      <Route
        path="/DAdmin"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["DepartmentAdmin"]}>
            <HomepageDAdmin />
          </ProtectedRoute>
        }
      />
      <Route
        path="/DepartmentComplaints"
        element={
          <ProtectedRoute role={userRole} allowedRoles={["DepartmentAdmin"]}>
            <DepartmentComplaints />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
