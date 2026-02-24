import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />; //Navigate it's different from navigate, with Navigate, if the condition its not true, the page will not be rendered
  }

  return children;
}