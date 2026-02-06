import SignUp from "../../../../components/ui/SignUp";
import { useSignUpController } from "./controllers/SignUpController";

export default function SignUpScreen() {
  const {
    handleSignUp,
    handleHaveAccount,
    loading,
    modalInfo,
    handleConfirm,
  } = useSignUpController();

  return (
    <SignUp
      handleSignUp={handleSignUp}
      handleHaveAccount={handleHaveAccount}
      loading={loading}
      modalInfo={modalInfo}
      handleConfirm={handleConfirm}
    />
  );
}
