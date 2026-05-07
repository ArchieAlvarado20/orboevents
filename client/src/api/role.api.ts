import axios from "axios";

const API = import.meta.env.VITE_API_URL + "/api/roles";

// GET all roles
export const getRoles = () => axios.get(API);

// CREATE role
export const createRole = (data: any) => axios.post(API, data);

// UPDATE role (PUT /roles/:id)
export const updateRole = (id: string, data: any) =>
  axios.put(`${API}/${id}`, data);

// DELETE role
export const deleteRole = (id: string) => axios.delete(`${API}/${id}`);
