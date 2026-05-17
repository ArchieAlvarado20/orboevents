import axios, { type AxiosRequestConfig } from "axios";

const API = `${import.meta.env.VITE_API_URL}/api`;

export const ticketTypeApi = {
  // CREATE
  create: (data: unknown, config?: AxiosRequestConfig) =>
    axios.post(`${API}/ticket-types`, data, config),

  // GET by event
  getByEvent: (eventId: string, config?: AxiosRequestConfig) =>
    axios.get(`${API}/events/${eventId}/ticket-types`, config),

  getTicketTypesByEvent: (eventId: string) =>
    axios.get(`${API}/events/${eventId}/public/ticket-types`),

  approveTicketType: (id: string, config?: AxiosRequestConfig) =>
    axios.patch(`${API}/ticket-types/${id}/approve`, {}, config),

  calcelTicketType: (id: string, config?: AxiosRequestConfig) =>
    axios.patch(`${API}/ticket-types/${id}/cancel`, {}, config),

  // UPDATE (resets to pending in backend)
  update: (id: string, data: unknown) => axios.put(`${API}/${id}`, data),

  // SOFT DELETE (FIXED)
  delete: (id: string) => axios.patch(`${API}/${id}/delete`),
};
