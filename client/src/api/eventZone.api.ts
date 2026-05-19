import axios, { type AxiosRequestConfig } from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/event-zones`;

export const eventZoneApi = {
  // GET ALL
  get: (config?: AxiosRequestConfig) => axios.get(API, config),

  // CREATE
  create: (eventId: string, data: unknown, config?: AxiosRequestConfig) =>
    axios.post(`${API}/event/${eventId}`, data, config),

  // GET BY EVENT
  getByEvent: (eventId: string, config?: AxiosRequestConfig) =>
    axios.get(`${API}/event/${eventId}`, config),

  // GET SINGLE
  getById: (id: string, config?: AxiosRequestConfig) =>
    axios.get(`${API}/${id}`, config),

  // UPDATE
  update: (id: string, data: unknown, config?: AxiosRequestConfig) =>
    axios.put(`${API}/${id}`, data, config),

  // DELETE
  delete: (id: string, config?: AxiosRequestConfig) =>
    axios.patch(`${API}/${id}`, {}, config),
};
