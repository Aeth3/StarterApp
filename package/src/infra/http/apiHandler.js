import Toast from "react-native-root-toast";
import axios from "axios";
import { clearSession } from "../../composition/authSession";

/**
 * Unified API request handler
 * Handles invalid token, network errors, and user notifications.
 */
export const handleApiRequest = async (apiCall, options = {}) => {
  const {
    showSuccess = false,
    successMessage = "Success",
    showError = true,
    errorMessage = "Something went wrong. Please try again.",
    autoLogout = true,
  } = options;

  try {
    const response = await apiCall();

    if (response?.success === false) {
      const message = response.message || "Unknown API error.";

      if (message.toLowerCase().includes("invalid token")) {
        if (autoLogout) {
          Toast.show("Session expired. Please log in again.", {
            duration: Toast.durations.LONG,
            position: Toast.positions.BOTTOM,
          });
          await clearSession();
        }
        throw new Error("Invalid token");
      }

      if (showError) {
        Toast.show(message, {
          duration: Toast.durations.SHORT,
          position: Toast.positions.BOTTOM,
        });
      }

      throw new Error(message);
    }

    if (response?.status === 401) {
      if (autoLogout) {
        Toast.show("Session expired. Please log in again.", {
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

    return response?.data || response;
  } catch (error) {
    console.error("API Handler Error:", error);

    if (axios.isAxiosError(error)) {
      if (error?.response?.status === 401 && autoLogout) {
        Toast.show("Session expired. Please log in again.", {
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
