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
      const { data, error } = await signInWithPassword({ email, password });
      if (error) throw error;
      if (!data?.user) throw new Error("No user returned from auth provider");

      await saveSession({
        access_token: data.session?.access_token,
        refresh_token: data.session?.refresh_token,
        user: data.user,
      });

      setAuth(data.user);
      return { success: true, user: data.user };
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
      await signOut();
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
