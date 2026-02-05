import apiClient from "../lib/apiClient";

export const HouseholdAPI = {
    getAll: (payload = {}) =>
        apiClient.post("/api/sample-endpoint", payload),

    getById: (id) => apiClient.get(`/households/${id}`),

    create: (payload) => apiClient.post("/households", payload),

    update: (id, payload) =>
        apiClient.put(`/households/${id}`, payload),

    remove: (id) => apiClient.delete(`/households/${id}`),
};