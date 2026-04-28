export const handleLogout = (redirectTo = "/admin") => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  window.location.replace(redirectTo);
};
