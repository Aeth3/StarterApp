import { signup } from "../../../services/authService"

export const postSignUp = async (formData) => {
  try {
    return await signup(formData) // keep structure intact
  } catch (error) {
    console.error(error)
    return { success: false, error }
  }
}