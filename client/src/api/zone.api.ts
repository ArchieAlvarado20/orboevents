import axios, { type AxiosRequestConfig } from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/zones`;

export const zoneApi = {
  // GET ALL (admin view)
  get: (config?: AxiosRequestConfig) => axios.get(API, config),

  // GET BY EVENT (IMPORTANT FOR YOUR EVENT PAGE)
  getByEvent: (eventId: string, config?: AxiosRequestConfig) =>
    axios.get(`${API}/event/${eventId}`, config),

  // CREATE ZONE (EVENT BASED)
  create: (data: unknown, config?: AxiosRequestConfig) =>
    axios.post(`${API}`, data, config),

  // UPDATE ZONE
  update: (id: string, data: unknown, config?: AxiosRequestConfig) =>
    axios.put(`${API}/${id}`, data, config),

  // DELETE ZONE
  delete: (id: string, config?: AxiosRequestConfig) =>
    axios.delete(`${API}/${id}`, config),
};
