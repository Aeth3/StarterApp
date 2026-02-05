import { supabase } from "../lib/supabase"
import { clearSession } from "./storageService"

export const signin = async (formData) => {
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password
        })
        if (error) throw error

        console.log("SUCCESS:", data)
        return { success: true, data }
    } catch (error) {
        console.log("FAILED:", error.message)
        return { success: false, error: error.message }
    }
}

export const signup = async ({ email, password, first_name, last_name }) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    first_name,
                    last_name
                }
            }
        })

        if (error) throw error

        console.log("SUCCESS:", data)
        return { success: true, data }
    } catch (error) {
        console.log("FAILED:", error.message)
        return { success: false, error: error.message }
    }
}

// 🚪 Logout function
export const signout = async () => {
    try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        return { error }
    } catch (error) {
        console.error("Logout failed:", error.message)
    }
}