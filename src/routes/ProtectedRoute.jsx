import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = sessionStorage.getItem("isAuthenticated");
  return isAuthenticated ? children : <Navigate to='/Login' />;
}

export default ProtectedRoute;
