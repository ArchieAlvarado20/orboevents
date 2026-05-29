import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) return null;

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
