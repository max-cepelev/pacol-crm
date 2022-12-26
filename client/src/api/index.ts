import axios from "axios";
import { User } from "../types";

const withCredentials = true;

// export const API_URL = `https://alfa-server.site`;
export const API_URL = `http://localhost:7000/api`;
const $api = axios.create({
  withCredentials,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    console.log(error.config);
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get<{ token: string; user: User }>(
          `${API_URL}/auth/refresh`,
          {
            withCredentials,
          }
        );
        localStorage.setItem("token", response.data.token);
        return $api.request(originalRequest);
      } catch (e) {
        console.log("НЕ АВТОРИЗОВАН");
      }
    }
    throw error;
  }
);

export default $api;
