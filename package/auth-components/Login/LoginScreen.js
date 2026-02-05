import React, { useState } from "react"
import { useLoginController } from "./controllers/LoginController"
import SignIn from "../../app/pages/Auth/SignIn"
import { useGlobal } from "../../context/context"
import config from "./config.json"
export default function LoginScreen() {
    const { handleLogin, handleSignUp, modalInfo, handleConfirm, appName } = useLoginController()
    const { loading, setLoading } = useGlobal()
    // return <SignIn handleLogin={handleLogin} handleSignUp={handleSignUp} modalInfo={modalInfo} handleConfirm={handleConfirm} appName={appName} />
    return <SignIn config={config} handleLogin={handleLogin} handleSignUp={handleSignUp} modalInfo={modalInfo} handleConfirm={handleConfirm}/>
}


