import {
  clearSession,
  saveSession,
  signInWithPassword,
  signOut,
} from "../../composition/authSession";
import { useGlobal } from "../../../context/context";

export const useAuth = () => {
  const { setAuth, setLoading } = useGlobal();

  const login = async (email, password) => {
    try {
      setLoading(true);
      const result = await signInWithPassword({ email, password });
      if (!result?.ok) {
        return {
          success: false,
          error: result?.error?.message || "Login failed",
        };
      }

      const { user, session } = result.value;

      await saveSession(session);

      setAuth(user);
      return { success: true, user };
    } catch (error) {
      console.error("Login error:", error.message);
      const errorMsg = error.message || "Login failed";
      return { success: false, error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const result = await signOut();
      if (!result?.ok) {
        throw new Error(result?.error?.message || "Sign out failed");
      }

      await clearSession();
      setAuth(null);
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    login,
    logout,
  };
};
