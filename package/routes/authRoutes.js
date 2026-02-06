
import SignUpScreen from "../src/presentation/auth/SignUp/SignUpScreen";
import LoginScreen from "../src/presentation/auth/Login/LoginScreen";

export const authRoutes = [
    {
        name: "Login",
        component: LoginScreen,
        options: {
            title: "Sign In",
            headerShown: false,
        },
    },
    {
        name: "SignUp",
        component: SignUpScreen,
        options: {
            title: "Sign In",
            headerShown: false,
        },
    }
];