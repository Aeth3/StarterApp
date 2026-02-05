import AsyncStorage from "@react-native-async-storage/async-storage"

const SESSION_KEY = "user_session"

export const saveSession = async (session) => {
    try {
        await AsyncStorage.setItem(SESSION_KEY, JSON.stringify(session))
    } catch (error) {
        console.error("Error saving session:", error)
    }
}

// export const getSession = async () => {
//     try {
//         const session = await AsyncStorage.getItem(SESSION_KEY)
//         return session ? JSON.parse(session) : null
//     } catch (error) {
//         console.error("Error loading session:", error)
//         return null
//     }
// }

export const getSession = async () => {
    try {
        const session = await AsyncStorage.getItem(SESSION_KEY)
        return session ? JSON.parse(session) : null
    } catch (error) {
        console.error("Error loading session:", error)
        return null
    }
}

export const getSessionToken = async () => {
    try {
        const session = await AsyncStorage.getItem(SESSION_KEY)
        const token = session ? JSON.parse(session).access_token.token : null
        return token
    } catch (error) {
        console.error("Error getting token", error)
        return null
    }
}

export const clearSession = async () => {
    try {
        await AsyncStorage.removeItem(SESSION_KEY)
    } catch (error) {
        console.error("Error clearing session:", error)
    }
}
