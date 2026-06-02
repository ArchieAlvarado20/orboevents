import { useEffect, useState } from "react";
import * as roleApi from "@/api/role.api";
import { RoleFormType } from "@/types/role";
import axios from "axios";

export default function useRoles() {
  const [roles, setRoles] = useState<RoleFormType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  // FETCH ALL ROLES
  const fetchRoles = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    try {
      const res = await roleApi.getRoles({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRoles(res.data.roles || res.data);
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
    } finally {
      setLoading(false);
    }
  };

  // DELETE ROLE
  const deleteRole = async (id: string) => {
    try {
      await roleApi.deleteRole(id);
      setRoles((prev) => prev.filter((r) => r._id !== id));
    } catch (err: any) {
      throw err?.response?.data?.message || "Failed to delete role";
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return {
    roles,
    loading,
    error,
    fetchRoles,
    deleteRole,
    unauthorized,
  };
}
