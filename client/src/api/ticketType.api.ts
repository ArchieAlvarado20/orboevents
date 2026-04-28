import axios, { type AxiosRequestConfig } from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/ticket-types`;

export const ticketTypeApi = {
  create: (data: unknown, config?: AxiosRequestConfig) =>
    axios.post(API, data, config),

  getByEvent: (eventId: string) => axios.get(`${API}/${eventId}`),

  update: (id: string, data: unknown) => axios.put(`${API}/${id}`, data),

  delete: (id: string) => axios.delete(`${API}/${id}`),
};
