import SignUp from "../../components/ui/SignUp"
import { useSignUpController } from "./controllers/SignUpController"


export default function SignUpScreen() {
    const { handleSignUp, handleHaveAccount, loading, modalInfo, setModalInfo, handleConfirm } = useSignUpController()
    return <SignUp handleSignUp={handleSignUp} handleHaveAccount={handleHaveAccount} loading={loading} modalInfo={modalInfo} setModalInfo={setModalInfo} handleConfirm={handleConfirm} />
}