import axios from "axios";
import { useNavigate } from "react-router-dom";

export function useAuthActions() {
  const navigate = useNavigate();

  const login = async (form: any) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/login`,
      form,
    );

    const token = res.data.accessToken;

    localStorage.setItem("token", token);

    const meRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = meRes.data;

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  };

  const register = async (form: any) => {
    const res = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/register`,
      form,
    );

    const token = res.data.accessToken;

    localStorage.setItem("token", token);

    const meRes = await axios.get(`${import.meta.env.VITE_API_URL}/api/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = meRes.data;

    localStorage.setItem("user", JSON.stringify(user));

    return user;
  };

  const googleLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
  };

  return {
    login,
    register,
    handleGoogleLogin: googleLogin,
    navigate,
  };
}
