import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuthContext();

  // Optional: Add a `loading` state in context to handle initial load
  if (user === null) {
    return <div>Loading...</div>; // Optional loader
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
