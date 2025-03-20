import { useState } from "react"
import Navbar from "../components/Navbar"
import SignUpForm from "../components/SignUpForm"

const SignupPage = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [dob, setDob] = useState("")
    const [gender, setGender] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        alert('Signed up with: ${firstName}, ${lastName}, ${username}, ${email}, ${password}, ${dob}, ${gender}')
    }

    return(
        <>
            <Navbar />

            <div className="container mx-auto p-4">
                <div className="flex flex-col items-center justify-center h-screen">
                    <SignUpForm
                        onSubmit={handleSubmit}
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        username={username}
                        setUsername={setUsername}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                        dob={dob}
                        setDob={setDob}
                        gender={gender}
                        setGender={setGender}
                    />
                </div>

            </div>
        </>
    )
}

export default SignupPage