import axios, { type AxiosRequestConfig } from "axios";

const API = `${import.meta.env.VITE_API_URL}/api`;

export const slotApi = {
  // GET SLOTS BY EVENT
  getByEvent: (eventId: string, config?: AxiosRequestConfig) =>
    axios.get(`${API}/events/${eventId}/slots`, config),

  getByEventPublic: (eventId: string) =>
    axios.get(`${API}/events/${eventId}/public/slots`),

  getSlotById: (slotId: string) => axios.get(`${API}/slot/${slotId}`),

  // CREATE SLOTS (for event)
  create: (eventId: string, data: unknown, config?: AxiosRequestConfig) =>
    axios.post(`${API}/events/${eventId}/slots`, data, config),

  bulkCreate: (eventId: string, data: unknown, config?: AxiosRequestConfig) =>
    axios.post(`${API}/events/${eventId}/slots/bulk`, data, config),

  approveSlots: (id: string, config?: AxiosRequestConfig) =>
    axios.patch(`${API}/slots/${id}/approve`, {}, config),

  calcelSlots: (id: string, config?: AxiosRequestConfig) =>
    axios.patch(`${API}/slots/${id}/cancel`, {}, config),

  // DELETE SLOT
  delete: (slotId: string, config?: AxiosRequestConfig) =>
    axios.delete(`${API}/slots/${slotId}`, config),
};
