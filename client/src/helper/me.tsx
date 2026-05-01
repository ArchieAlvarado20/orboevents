import axios from "axios";

export const getMe = async (token: string) => {
  const res = await axios.get("/api/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
