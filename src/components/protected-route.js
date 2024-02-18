import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/authProvider";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const ProtectedRoute = ({ children }) => {
  const { token } = useAuth();
  if (!token) {
    toast.error('Please login to continue.');
    return <Navigate to="/login" />;
  }
  return children;
};