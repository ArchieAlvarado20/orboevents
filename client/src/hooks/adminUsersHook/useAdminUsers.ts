import { useEffect, useState } from "react";
import { adminUsersApi } from "@/api/adminUsers.api";
import { UserType } from "@/types/adminUsers.type";
import axios from "axios";

export const useAdminUsers = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [unauthorized, setUnauthorized] = useState(false);

  // 📌 GET USERS
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    try {
      const res = await adminUsersApi.get({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (err: unknown) {
      let message = "Something went wrong!";

      if (axios.isAxiosError(err)) {
        message = err.response?.data?.message || message;

        if (err.response?.status === 401 || err.response?.status === 403) {
          setUnauthorized(true);
        }
      } else if (err instanceof Error) {
        message = err.message;
      }

      console.log(message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    error,
    unauthorized,
    refetch: fetchUsers,
  };
};
