import React from "react";
import { useLoginController } from "./controllers/LoginController";
import SignIn from "../../../../app/pages/Auth/SignIn";
import config from "./config.json";

export default function LoginScreen() {
  const { handleLogin, handleSignUp, modalInfo, handleConfirm, appName } =
    useLoginController();

  return (
    <SignIn
      config={config}
      handleLogin={handleLogin}
      handleSignUp={handleSignUp}
      modalInfo={modalInfo}
      handleConfirm={handleConfirm}
    />
  );
}
