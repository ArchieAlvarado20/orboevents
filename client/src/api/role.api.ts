import axios, { type AxiosRequestConfig } from "axios";

const API = import.meta.env.VITE_API_URL + "/api/roles";

// GET all roles
export const getRoles = (config?: AxiosRequestConfig) => axios.get(API, config);

// CREATE role
export const createRole = (data: unknown, config?: AxiosRequestConfig) =>
  axios.post(API, data, config);

// UPDATE role (PUT /roles/:id)
export const updateRole = (id: string, data: any) =>
  axios.put(`${API}/${id}`, data);

// DELETE role
export const deleteRole = (id: string) => axios.delete(`${API}/${id}`);
