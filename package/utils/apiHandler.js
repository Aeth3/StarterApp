import Toast from "react-native-root-toast";
import { clearSession, getSession } from "package/services/storageService";
import axios from "axios";

/**
 * Unified API request handler
 * Handles invalid token, network errors, and user notifications.
 */
export const handleApiRequest = async (apiCall, options = {}) => {
    const {
        showSuccess = false,
        successMessage = "✅ Success",
        showError = true,
        errorMessage = "❌ Something went wrong. Please try again.",
        autoLogout = true,
    } = options;

    try {
        const response = await apiCall();

        // ✅ Check structured API responses
        if (response?.success === false) {
            const message = response.message || "Unknown API error.";

            // Handle token issues
            if (message.toLowerCase().includes("invalid token")) {
                if (autoLogout) {
                    Toast.show("⚠️ Session expired. Please log in again.", {
                        duration: Toast.durations.LONG,
                        position: Toast.positions.BOTTOM,
                    });
                    await clearSession();

                }
                throw new Error("Invalid token");
            }

            if (showError) {
                Toast.show(`⚠️ ${message}`, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                });
            }

            throw new Error(message);
        }

        // ✅ Axios 401 handling
        if (response?.status === 401) {
            if (autoLogout) {
                Toast.show("⚠️ Session expired. Please log in again.", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                });
                await clearSession();
            }
            throw new Error("Unauthorized");
        }

        if (showSuccess) {
            Toast.show(successMessage, {
                duration: Toast.durations.SHORT,
                position: Toast.positions.BOTTOM,
            });
        }

        return response?.data || response; // return cleaned result
    } catch (error) {
        console.error("❌ API Handler Error:", error);

        // Handle Axios or Network Errors
        if (axios.isAxiosError(error)) {
            if (error?.response?.status === 401 && autoLogout) {
                Toast.show("⚠️ Session expired. Please log in again.", {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                });
                await clearSession();
                navigate("LoginScreen");
                return;
            }

            if (showError) {
                Toast.show(errorMessage, {
                    duration: Toast.durations.LONG,
                    position: Toast.positions.BOTTOM,
                });
            }
        } else {
            if (showError) {
                Toast.show(errorMessage, {
                    duration: Toast.durations.SHORT,
                    position: Toast.positions.BOTTOM,
                });
            }
        }

        throw error;
    }
};
