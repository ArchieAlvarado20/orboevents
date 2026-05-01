export const validateAuthForm = (form: any, isLogin: boolean) => {
  if (!form.email || !form.password) {
    return "Email and password are required";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    return "Invalid email format";
  }

  if (form.password.length < 6) {
    return "Password must be at least 6 characters";
  }

  if (!isLogin) {
    if (!form.name) {
      return "Name is required";
    }

    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }
  }

  return null;
};
