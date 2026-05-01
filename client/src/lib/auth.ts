export const handleLogout = (navigate: any, redirectTo: string) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  navigate(redirectTo);
};
