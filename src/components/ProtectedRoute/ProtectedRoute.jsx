import { Navigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
