import { Navigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import { getToken } from "../utils/auth";

function AdminRoute({ children }) {
  const token = getToken();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    if (decoded.role !== "admin") {
      return <Navigate to="/" replace />;
    }

    return children;
  } catch (err) {
    return <Navigate to="/login" replace />;
  }
}

export default AdminRoute;
