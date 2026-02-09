import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoadingProvider } from "./context/LoadingContext";
import Preloader from "./components/Preloader";
import PageLoader from "./components/PageLoader";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/user/Dashboard";
import Courses from "./pages/user/Courses";
import MyRegistration from "./pages/user/MyRegistration";


import AdminDashboard from "./pages/admin/Dashboard";
import AdminCourses from "./pages/admin/Courses";
import AdminPending from "./pages/admin/Pending";
import AdminStudents from "./pages/admin/Students";
import AdminRegistered from "./pages/admin/Registered";

import ProtectedRoute from "./components/ProtectedRoute";
import Unauthorized from "./pages/Unauthorized";


function App() {
  return (
    <LoadingProvider>
      <Preloader />
      <BrowserRouter>
        <PageLoader />
        <Routes>

          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Student routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/courses"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-registrations"
            element={
              <ProtectedRoute>
                <MyRegistration />
              </ProtectedRoute>
            }
          />

          {/* Admin routes */}
          <Route
            path="/admin/dashboard"
            element={
              <ProtectedRoute role="admin">
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/courses"
            element={
              <ProtectedRoute role="admin">
                <AdminCourses />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/pending"
            element={
              <ProtectedRoute role="admin">
                <AdminPending />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin/registered"
            element={
              <ProtectedRoute role="admin">
                <AdminRegistered />
              </ProtectedRoute>
            }
          />

          <Route
            path="/admin/students"
            element={
              <ProtectedRoute role="admin">
                <AdminStudents />
              </ProtectedRoute>
            }
          />


          <Route path="/unauthorized" element={<Unauthorized />} />


        </Routes>
      </BrowserRouter>
    </LoadingProvider>
  );
}

export default App;
