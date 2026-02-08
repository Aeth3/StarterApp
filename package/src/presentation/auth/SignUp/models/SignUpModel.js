import { signUp } from "../../../../composition/authSession";

export const postSignUp = async ({
  email,
  password,
  first_name,
  last_name,
}) => {
  try {
    const { data, error } = await signUp({
      email,
      password,
      first_name,
      last_name,
    });
    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message || "Sign up failed" };
  }
};
