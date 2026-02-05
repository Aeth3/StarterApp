import { signin } from "../../../services/authService";


export const postSignIn = async (formData) => {
    try {
        return await signin(formData)
    } catch (error) {
        console.error(error);
        return { success: false, error }
    }
}