import { AxiosRequestConfig } from "axios";
import api from "./interceptor.api";

const API = `/api/admin/dashboard`;

export const dashboardApi = {
  getOverview: (config?: AxiosRequestConfig) =>
    api.get(`${API}/overview`, config),

  getReservationDashboard: (config?: AxiosRequestConfig) =>
    api.get(`${API}/reservations`, config),
};
