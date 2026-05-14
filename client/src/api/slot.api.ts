import axios, { type AxiosRequestConfig } from "axios";

const API = `${import.meta.env.VITE_API_URL}/api`;

export const slotApi = {
  // GET SLOTS BY EVENT
  getByEvent: (eventId: string, config?: AxiosRequestConfig) =>
    axios.get(`${API}/events/${eventId}/slots`, config),

  // CREATE SLOTS (for event)
  create: (eventId: string, data: unknown, config?: AxiosRequestConfig) =>
    axios.post(`${API}/events/${eventId}/slots`, data, config),

  bulkCreate: (eventId: string, data: unknown, config?: AxiosRequestConfig) =>
    axios.post(`${API}/events/${eventId}/slots/bulk`, data, config),

  // DELETE SLOT
  delete: (slotId: string, config?: AxiosRequestConfig) =>
    axios.delete(`${API}/slots/${slotId}`, config),
};
