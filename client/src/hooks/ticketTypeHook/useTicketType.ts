import api from "@/api/interceptor.api";
import { ticketTypeApi } from "@/api/ticketType.api";
import { userEventApi } from "@/api/userEvent.api";
import { showError, showSuccess } from "@/lib/hotToast";
import { TicketTypeForm } from "@/types/ticketTypes";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useReservation from "../reservation/useReservation";
import { SlotFormType } from "@/types/slot.type";

export default function useTicketType() {
  const { id } = useParams();
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [tickets, setTickets] = useState<TicketTypeForm[]>([]);
  const [error, setError] = useState("");
  const [event, setEvent] = useState<Event | null>(null);
  const { fetchReservations } = useReservation();
  const [slots, setSlots] = useState<SlotFormType[]>([]);

  const handleSelectTicket = (ticket: any) => {
    setSelectedTicket(ticket);

    setTimeout(() => {
      const el = document.getElementById("reservation");

      if (el) {
        el.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }, 50);
  };

  const fetchData = async () => {
    setLoading(true);

    try {
      const eventRes = await userEventApi.getByEventID(id);
      setEvent(eventRes.data);
    } catch (err) {
      console.error("Event failed", err);
      setError("Failed to load event");
    }

    try {
      const ticketRes = await ticketTypeApi.getTicketTypesByEvent(id);
      setTickets(ticketRes.data || []);
      console.log(ticketRes.data);
    } catch (err: unknown) {
      console.error("Tickets failed", err);
      setTickets([]);
    }

    // try {
    //   const slotsRes = await slotApi.getByEvent(id);
    //   setSlots(slotsRes.data || []);
    //   console.log(slotsRes.data);
    // } catch (err) {
    //   console.error("Slots failed", err);
    //   setSlots([]);
    // }

    setLoading(false);
  };

  const handleReserve = async () => {
    if (!selectedTicket || !event) return;

    try {
      const res = await api.post(
        "/api/reservations",
        {
          eventId: event._id,
          ticketTypeId: selectedTicket._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      console.log("Reservation success:", res.data);
      showSuccess("Ticket Reserved!");
      fetchReservations();
      setSelectedTicket(null);

      setTimeout(() => {
        const el = document.getElementById("selectedTicket");

        if (el) {
          el.scrollIntoView({
            behavior: "smooth",
            block: "center",
          });
        }
      }, 50);

      // navigate("/reservation");
    } catch (error: any) {
      console.log(error.response?.data || error.message);
      showError(error.response?.data?.message || "Reservation failed");
    }
  };

  return {
    event,
    error,
    tickets,
    loading,
    fetchData,
    selectedTicket,
    setSelectedTicket,
    handleSelectTicket,
    handleReserve,
  };
}
