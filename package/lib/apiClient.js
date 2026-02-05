import axios from "axios";
import { getAuthToken } from "../utils/storage"
import { API_BASE_URL, API_TIMEOUT } from "@env"
import { getSession } from "package/services/storageService";

const apiClient = axios.create({
    baseURL: API_BASE_URL, // 🔴 change this
    timeout: Number(API_TIMEOUT),
    headers: {
        "Content-Type": "application/json",
    },
});

/**
 * REQUEST INTERCEPTOR
 * Attach auth token, log, etc.
 */
apiClient.interceptors.request.use(
    async (config) => {
        const session = await getSession()
        console.log("session", session);

        if (session) {
            config.headers.Authorization = `Bearer ${session.access_token.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

/**
 * RESPONSE INTERCEPTOR
 * Normalize errors
 */
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
