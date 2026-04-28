import { type AxiosRequestConfig } from "axios";
export declare const eventApi: {
    get: (config?: AxiosRequestConfig) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    create: (data: unknown, config?: AxiosRequestConfig) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    getByEvent: (eventId: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    update: (id: string, data: unknown) => Promise<import("axios").AxiosResponse<any, any, {}>>;
    delete: (id: string) => Promise<import("axios").AxiosResponse<any, any, {}>>;
};
