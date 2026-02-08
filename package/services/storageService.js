import {
  clearSession as clearSessionUseCase,
  getAccessToken,
  getSession as getSessionUseCase,
  saveSession as saveSessionUseCase,
} from "../src/composition/authSession";

export const saveSession = async (session) => {
  try {
    await saveSessionUseCase(session);
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

export const getSession = async () => {
  try {
    return await getSessionUseCase();
  } catch (error) {
    console.error("Error loading session:", error);
    return null;
  }
};

export const getSessionToken = async () => {
  try {
    return await getAccessToken();
  } catch (error) {
    console.error("Error getting token", error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await clearSessionUseCase();
  } catch (error) {
    console.error("Error clearing session:", error);
  }
};
