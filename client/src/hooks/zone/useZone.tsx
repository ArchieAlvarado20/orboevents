import { useEffect, useState } from "react";

import axios from "axios";
import { zoneApi } from "@/api/zone.api";
import { showSuccess } from "@/lib/toast";

export default function useZones() {
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [unauthorized, setUnauthorized] = useState(false);

  const fetchZones = async () => {
    setLoading(true);
    setError(null);

    const token = localStorage.getItem("token");

    if (!token) {
      alert("Unauthorized");
      return;
    }

    try {
      const res = await zoneApi.get({
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res.data);
      setZones(res.data || []);
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
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const deleteZone = async (id: string) => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Unauthorized");
      return false;
    }
    try {
      await zoneApi.delete(id, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showSuccess("Zone deleted successfully.");
      setZones((prev) => prev.filter((z: any) => z._id !== id));
    } catch (err: any) {
      throw err?.response?.data?.message || "Failed to delete zone";
    }
  };

  useEffect(() => {
    fetchZones();
  }, []);

  return {
    zones,
    loading,
    error,
    fetchZones,
    deleteZone,
    unauthorized,
  };
}
