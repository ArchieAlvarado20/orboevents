import { showError, showSuccess } from "@/lib/hotToast";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useReservation() {
  const [loading, setLoading] = useState(true);
  const [reservations, setReservations] = useState<any[]>([]);
  const [selectedReservations, setSelectedReservations] =
    useState(reservations);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

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
    if (reservations.length > 0) {
      setSelectedReservations(reservations);
    }
  }, [reservations.length]);

  const handlePayment = async () => {
    try {
      // 1. CREATE TRANSACTION (backend computes total)
      const txRes = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/transactions/checkout`,
        {
          reservationIds: selectedReservations.map((r) => r._id),
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      const { transaction, razorpayOrder } = txRes.data;

      // 3. CHECK RAZORPAY SCRIPT
      if (!window.Razorpay) {
        showError("Razorpay not loaded");
        return;
      }

      // 4. OPEN PAYMENT MODAL
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        order_id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,

        name: "orboevents",
        description: `Payment for ${selectedReservations.length} ticket(s)`,

        handler: async function (response) {
          try {
            // 5. CONFIRM PAYMENT (VERY IMPORTANT)
            await axios.post(
              `${import.meta.env.VITE_API_URL}/api/transactions/success`,
              {
                transactionId: transaction._id,
                reservationIds: selectedReservations.map((r) => r._id),

                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                signature: response.razorpay_signature,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              },
            );
            navigate(`/transaction`);
            showSuccess("Payment successful!");

            await fetchReservations();
          } catch (err) {
            console.error(err);
            showError("Payment verification failed");
          }
        },

        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "user@email.com",
        },

        theme: {
          color: "#3399cc",
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error(err);
      showError("Payment failed to initialize");
    }
  };

  const toggleReservation = (r) => {
    setSelectedReservations((prev) => {
      const isSelected = prev.some((s) => s._id === r._id);

      // if already selected
      if (isSelected) {
        // prevent removing last item
        if (prev.length === 1) return prev;

        return prev.filter((s) => s._id !== r._id);
      }

      // add if not selected
      return [...prev, r];
    });
  };

  const cancelReservation = async (reservationId) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/api/reservations/${reservationId}/cancel`,
        {}, // body (empty kasi wala kang data)
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      showSuccess("Reservation cancelled");

      setReservations((prev) => prev.filter((r) => r._id !== reservationId));
    } catch (err) {
      console.error(err);
      showError("Failed to cancel reservation");
    }
  };

  return {
    toggleReservation,
    setReservations,
    fetchReservations,
    setSelectedReservations,
    handlePayment,
    cancelReservation,
    selectedReservations,
    reservations,
    loading,
  };
}
