
import { useEffect, useState } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import config from "../config.json"
import { useGlobal } from "../../../context/context";

export const useLoginController = () => {
    const { login } = useAuth();
    const { modalInfo, setModalInfo } = useGlobal()
    const navigation = useNavigation()


    const handleLogin = async (formData) => {
        const { email, password } = formData;

        if (!email || !password) {
            setModalInfo({
                show: true,
                title: "Missing Fields",
                message: "Please enter both email and password.",
            });
            return;
        }

        // if (!/\S+@\S+\.\S+/.test(email)) {
        //     setModalInfo({
        //         show: true,
        //         title: "Invalid Email",
        //         message: "Please enter a valid email address.",
        //     });
        //     return;
        // }

        const response = await login(email, password);
        console.log("response", response);

        if (!response.success) {
            console.log("not success");

            setModalInfo(prev => ({
                ...prev,
                show: true,
                title: "Login Failed",
                message: response.error,
            }));
        }
    };

    const handleSignUp = () => {
        navigation.navigate("SignUp")
    }

    const handleConfirm = () => setModalInfo(prev => ({ ...prev, show: false }));
    useEffect(() => {
        console.log("modal info effect", modalInfo);

    }, [modalInfo])
    return { handleLogin, modalInfo, handleConfirm, handleSignUp, appName: config.appName };
};