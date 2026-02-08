import axios from "axios";
import { API_BASE_URL, API_TIMEOUT } from "@env";

let accessTokenProvider = async () => null;

export const setAccessTokenProvider = (provider) => {
  accessTokenProvider = typeof provider === "function" ? provider : async () => null;
};

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: Number(API_TIMEOUT),
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    const token = await accessTokenProvider();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response.data,
  (error) => {
    const normalizedError = {
      status: error.response?.status,
      message:
        error.response?.data?.message ||
        error.message ||
        "Network error",
      data: error.response?.data,
    };

    return Promise.reject(normalizedError);
  }
);

export default apiClient;
