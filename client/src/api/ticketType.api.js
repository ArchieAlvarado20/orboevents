import axios, {} from "axios";
const API = `${import.meta.env.VITE_API_URL}/api/ticket-types`;
export const ticketTypeApi = {
    create: (data, config) => axios.post(API, data, config),
    getByEvent: (eventId) => axios.get(`${API}/${eventId}`),
    update: (id, data) => axios.put(`${API}/${id}`, data),
    delete: (id) => axios.delete(`${API}/${id}`),
};
