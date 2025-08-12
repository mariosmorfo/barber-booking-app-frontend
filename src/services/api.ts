import axios from "axios";
import { getToken, clearToken } from "../utils/authTokenUtil";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: false, 
});


api.interceptors.request.use(
  (config) => {
    const token = getToken();           
    if (token) {
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      clearToken?.();
    }
    return Promise.reject(err);
  }
);
