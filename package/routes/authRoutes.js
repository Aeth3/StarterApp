import LoginScreen from "../auth-components/Login/LoginScreen";
import SignUpScreen from "../auth-components/SignUp/SignUpScreen";


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