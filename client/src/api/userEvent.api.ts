import axios, { type AxiosRequestConfig } from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/events`;

export const userEventApi = {
  get: (params?: any) => axios.get(API, { params }),

  create: (data: unknown, config?: AxiosRequestConfig) =>
    axios.post(API, data, config),

  getByEventID: (eventId: string) => axios.get(`${API}/${eventId}/public`),

  update: (id: string, data: unknown) => axios.put(`${API}/${id}`, data),

  delete: (id: string) => axios.delete(`${API}/${id}`),
};
