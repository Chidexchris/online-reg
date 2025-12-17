import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../utils/auth";

function ProtectedRoute({ children, role }) {
  const token = getToken();

  // Not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Role check (only if role is provided)
    if (role && decoded.role !== role) {
      return <Navigate to="/unauthorized" replace />;
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" replace />;
  }
}

export default ProtectedRoute;
