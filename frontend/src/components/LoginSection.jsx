import LoginButton from "./LoginButton";

const LoginSection = ({ onLoginClick }) => {
    return(
        <div className="flex flex-col items-center">
            <LoginButton
                text="LOGIN"
                onClick={onLoginClick}
                className="bg-amber-400 text-white hover:bg-amber-500 mt-12"
            />

            <h1 className="font-sans mt-4">Or Signup Here!</h1>
        </div>
    )
}

export default LoginSection