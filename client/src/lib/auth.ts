export const handleLogout = async () => {
  try {
    await fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
  } catch (err) {}

  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.replace("/admin");
};
