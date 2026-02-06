import { signInWithPassword } from "../src/domain/usecases/SignInWithPassword";
import { signUp as signUpUsecase } from "../src/domain/usecases/SignUp";
import { signOut as signOutUsecase } from "../src/domain/usecases/SignOut";

export const signin = async (formData) => {
  try {
    const { data, error } = await signInWithPassword({
      email: formData.email,
      password: formData.password,
    });
    if (error) throw error;

    console.log("SUCCESS:", data);
    return { success: true, data };
  } catch (error) {
    console.log("FAILED:", error.message);
    return { success: false, error: error.message };
  }
};

export const signup = async ({ email, password, first_name, last_name }) => {
  try {
    const { data, error } = await signUpUsecase({
      email,
      password,
      first_name,
      last_name,
    });

    if (error) throw error;

    console.log("SUCCESS:", data);
    return { success: true, data };
  } catch (error) {
    console.log("FAILED:", error.message);
    return { success: false, error: error.message };
  }
};

export const signout = async () => {
  try {
    const { error } = await signOutUsecase();
    if (error) throw error;
    return { error };
  } catch (error) {
    console.error("Logout failed:", error.message);
  }
};
