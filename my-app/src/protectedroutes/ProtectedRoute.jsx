import LoaderExampleText from "../components/Loader";
import { useAuthContext } from "../hooks/useAuthContext";
import {Navigate} from "react-router-dom"
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuthContext();

  if (loading) {
    return <LoaderExampleText />; // Show loader until auth check completes
  }

  return user ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute

