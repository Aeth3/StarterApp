import { useEffect, useState } from "react"
import { clearSession, getSession, saveSession } from "../services/storageService"
import { supabase } from "../lib/supabase"
import { signout } from "../services/authService"
import { useGlobal } from "../context/context"
import config from "../config.json"
import { API_BASE_URL, API_KEY, API_TIMEOUT } from "@env"
import axios from "axios"

import { getAuthHeader } from "package/lib/helpers"
export const useAuth = () => {
    const { setAuth, setLoading } = useGlobal()

    // 🔄 Listen for token rotation and update stored session
    // useEffect(() => {
    //     const { data: subscription } = supabase.auth.onAuthStateChange(
    //         async (event, session) => {
    //             // Save new session when access/refresh tokens rotate
    //             if (session) {
    //                 await saveSession({
    //                     access_token: session.access_token,
    //                     refresh_token: session.refresh_token,
    //                     user: session.user,
    //                 })

    //                 setAuth(session.user)
    //             } else {
    //                 await clearSession()
    //                 setAuth(null)
    //             }
    //         }
    //     )

    //     return () => subscription.subscription.unsubscribe()
    // }, [])


    // 🔐 Login function
    // const login = async (email, password) => {
    //     try {
    //         setLoading(true)
    //         const { data, error } = await supabase.auth.signInWithPassword({ email, password })

    //         if (error) throw error
    //         if (!data?.user) throw new Error("No user returned from Supabase")

    //         // Save session
    //         await saveSession({
    //             access_token: data.session.access_token,
    //             refresh_token: data.session.refresh_token,
    //             user: data.user,
    //         })

    //         setAuth(data.user)
    //         return { success: true }
    //     } catch (error) {
    //         return { success: false, error: error.message }
    //     } finally {
    //         setLoading(false)
    //     }
    // }


    // 🔐 Login - USE FOR ACTUAL LOGIN
    // const login = async (email, password) => {
    //     try {
    //         setLoading(true);
    //         console.log("API base url:", API_BASE_URL);
    //         const response = await axios.get(`${API_BASE_URL}/api/login`, {
    //             headers: {
    //                 Authorization: getAuthHeader(email, password),
    //             },
    //         });

    //         // If success, handle data
    //         const data = response.data;
    //         console.log("Login success:", data);

    //         // Save tokens and user session
    //         await saveSession({
    //             access_token: data.token,
    //             refresh_token: data.refreshToken,
    //             user: data.user_details,
    //         });

    //         setAuth(data.user_details);
    //         return { success: true, user: data.user_details };

    //     } catch (error) {
    //         console.error("Login error:", error.response?.data || error.message);

    //         // Extract meaningful error message
    //         const errorMsg = error.response?.data?.msg || error.message || "Login failed";
    //         return { success: false, error: errorMsg };

    //     } finally {
    //         setLoading(false);
    //     }
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
    
    // // 🚪 Logout
    // const logout = async () => {
    //     try {
    //         setLoading(true);

    //         const session = await getSession();

    //         if (session?.access_token) {
    //             // Optionally notify the backend
    //             await fetch("https://your-api-domain.com/api/auth/logout", {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                     Authorization: `Bearer ${session.access_token}`,
    //                 },
    //             });
    //         }

    //         await clearSession();
    //         setAuth(null);

    //         return { success: true };
    //     } catch (error) {
    //         console.error("Logout failed:", error.message);
    //         return { success: false, error: error.message };
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // // ♻️ Optional: auto-refresh token every X minutes
    // const refreshToken = async () => {
    //     try {
    //         const session = await getSession();
    //         if (!session?.refresh_token) return;

    //         const res = await fetch("https://your-api-domain.com/api/auth/refresh", {
    //             method: "POST",
    //             headers: { "Content-Type": "application/json" },
    //             body: JSON.stringify({ refreshToken: session.refresh_token }),
    //         });

    //         if (res.ok) {
    //             const data = await res.json();
    //             await saveSession({
    //                 ...session,
    //                 access_token: data.token,
    //             });
    //         } else {
    //             await clearSession();
    //             setAuth(null);
    //         }
    //     } catch (error) {
    //         console.error("Token refresh failed:", error.message);
    //         await clearSession();
    //         setAuth(null);
    //     }
    // };

    // // Optionally: auto-refresh token on mount or periodically
    // useEffect(() => {
    //     const interval = setInterval(refreshToken, 1000 * 60 * 10); // every 10 min
    //     return () => clearInterval(interval);
    // }, []);

    // const login = async () => {
    //     try {
    //         await saveSession({
    //             access_token: "access_token",
    //             refresh_token: "refresh_token",
    //             user: config.user_data,
    //         })
    //         setAuth(config.user_data)
    //         return { success: true }
    //     } catch (error) {
    //         return { success: false, error: error.message }
    //     } finally {
    //         setLoading(false)
    //     }
    // }

    // 🚪 Logout function
    const logout = async () => {
        try {
            setLoading(true)
            // const { error } = await signout()
            // if (error) throw error

            await clearSession()
            setAuth(null)
        } catch (error) {
            console.error("Logout failed:", error.message)
        } finally {
            setLoading(false)
        }
    }

    return {
        login,        // login(email, password)
        logout,       // logout()
    }
}
