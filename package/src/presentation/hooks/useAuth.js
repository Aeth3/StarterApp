import { clearSession } from "../../domain/usecases/ClearSession";
import { saveSession } from "../../domain/usecases/SaveSession";
import { signInWithPassword } from "../../domain/usecases/SignInWithPassword";
import { signOut } from "../../domain/usecases/SignOut";
import { useGlobal } from "../../../context/context";

export const useAuth = () => {
  const { setAuth, setLoading } = useGlobal();

  // const login = async (email, password) => {
  //   try {
  //     setLoading(true);
  //     const { data, error } = await signInWithPassword({ email, password });
  //     if (error) throw error;
  //     if (!data?.user) throw new Error("No user returned from auth provider");

  //     await saveSession({
  //       access_token: data.session?.access_token,
  //       refresh_token: data.session?.refresh_token,
  //       user: data.user,
  //     });

  //     setAuth(data.user);
  //     return { success: true, user: data.user };
  //   } catch (error) {
  //     console.error("Login error:", error.message);

  //     const errorMsg = error.message || "Login failed";
  //     return { success: false, error: errorMsg };
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // TEST LOGIN
    const login = async (email, password) => {
        try {
            setLoading(true);
            console.log("API base url:", API_BASE_URL);

            // Save tokens and user session
            await saveSession({
                access_token: config.user_data.id,
                refresh_token: config.user_data.id,
                user: config.user_data,
            });

            setAuth(config.user_data);
            return { success: true, user: config.user_data };

        } catch (error) {
            console.error("Login error:", error.response?.data || error.message);

            // Extract meaningful error message
            const errorMsg = error.response?.data?.msg || error.message || "Login failed";
            return { success: false, error: errorMsg };

        } finally {
            setLoading(false);
        }
    };

  
  // const logout = async () => {
  //   try {
  //     setLoading(true);
  //     await signOut();
  //     await clearSession();
  //     setAuth(null);
  //   } catch (error) {
  //     console.error("Logout failed:", error.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // TEST LOGOUT
  const logout = async () => {
    try {
      setLoading(true);
      // await signOut();
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
