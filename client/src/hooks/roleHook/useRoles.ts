import { useEffect, useState } from "react";
import * as roleApi from "@/api/role.api";

export interface RoleType {
  _id: string;
  name: string;
  description?: string;
  permissions: string[];
  status?: "active" | "inactive";
  scopeType?: string;
}

export default function useRoles() {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // FETCH ALL ROLES
  const fetchRoles = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await roleApi.getRoles();
      setRoles(res.data.roles || res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to fetch roles");
    } finally {
      setLoading(false);
    }
  };

  // CREATE ROLE
  const createRole = async (data: any) => {
    try {
      const res = await roleApi.createRole(data);
      setRoles((prev) => [res.data.role, ...prev]);
      return res.data;
    } catch (err: any) {
      throw err?.response?.data?.message || "Failed to create role";
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
    createRole,
    deleteRole,
  };
}
