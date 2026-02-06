import { sessionRepository } from "../src/data/repositories/SessionRepositoryImpl";

export const saveSession = async (session) => {
  try {
    await sessionRepository.saveSession(session);
  } catch (error) {
    console.error("Error saving session:", error);
  }
};

export const getSession = async () => {
  try {
    return await sessionRepository.getSession();
  } catch (error) {
    console.error("Error loading session:", error);
    return null;
  }
};

export const getSessionToken = async () => {
  try {
    return await sessionRepository.getAccessToken();
  } catch (error) {
    console.error("Error getting token", error);
    return null;
  }
};

export const clearSession = async () => {
  try {
    await sessionRepository.clearSession();
  } catch (error) {
    console.error("Error clearing session:", error);
  }
};
