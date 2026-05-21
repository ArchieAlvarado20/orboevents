import axios from "axios";
import { useEffect, useState } from "react";

export default function useReservation() {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<any[]>([]);

  const fetchReservations = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/reservations/my`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      setReservations(res.data.reservations);
    } catch (error) {
      console.log(error);
      setReservations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  return {
    setReservations,
    fetchReservations,
    reservations,
    loading,
  };
}
