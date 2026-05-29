import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }: any) {
  const [checking, setChecking] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    setChecking(false);
  }, []);

  if (checking) return null; // or spinner

  if (!token) {
    return <Navigate to="/admin" replace />;
  }

  return children;
}
