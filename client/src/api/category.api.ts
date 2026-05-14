import axios, { type AxiosRequestConfig } from "axios";

const API = `${import.meta.env.VITE_API_URL}/api/categories`;

export const categoryApi = {
  get: (config?: AxiosRequestConfig) => axios.get(API, config),

  getById: (id: string, config?: AxiosRequestConfig) =>
    axios.get(`${API}/${id}`, config),

  create: (data: unknown, config?: AxiosRequestConfig) =>
    axios.post(API, data, config),

  update: (id: string, data: unknown, config?: AxiosRequestConfig) =>
    axios.put(`${API}/${id}`, data, config),

  delete: (id: string, config?: AxiosRequestConfig) =>
    axios.delete(`${API}/${id}`, config),
};
