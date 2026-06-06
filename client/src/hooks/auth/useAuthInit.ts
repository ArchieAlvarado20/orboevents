import { useEffect, useRef } from "react";
import axios from "axios";

export const useAuthInit = ({
  setUser,
  navigate,
  showSuccess,
  showError,
}: any) => {
  const hasRun = useRef(false);

  useEffect(() => {
    const token =
      new URLSearchParams(window.location.search).get("token") ||
      localStorage.getItem("token");

    if (!token) return;

    const hasShown = sessionStorage.getItem("auth-toast");

    const initAuth = async () => {
      if (hasRun.current) return;
      hasRun.current = true;

      try {
        localStorage.setItem("token", token);

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const user = res.data;

        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);

        if (!hasShown) {
          showSuccess?.(`Welcome back, ${user.name}!`);
          sessionStorage.setItem("auth-toast", "true");
        }
      } catch (err) {
        console.error(err);

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        showError?.("Authentication failed.");
        const isAdminRoute = window.location.pathname.startsWith("/admin");
        navigate(isAdminRoute ? "/admin" : "/login");
      }
    };

    initAuth();
  }, []);
};
