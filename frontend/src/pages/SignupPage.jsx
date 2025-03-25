import { useState } from "react"
import axios from "axios"
import Navbar from "../components/Navbar"
import SignUpForm from "../components/SignUpForm"
import '../App.css'

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
        alert(`Signed up with: ${firstName}, ${lastName}, ${username}, ${email}, ${password}, ${dob}, ${gender}`)
    }

    return(
        <div>
            <Navbar />

            <div className="container mx-auto my-auto">
                <div className="flex flex-col items-center justify-center h-screen">
                    <img 
                        src="/YapYapLogo.svg" 
                        alt="Duck Logo" 
                        className="h-60 w-60 float-animation"
                        // style={{ animation: 'floatUpDown 2s ease-in-out infinite' }}
                    />
                    <img 
                        src="/YapYapLogo.svg" 
                        alt="Duck Logo" 
                        className="h-15 w-15 -mb-4 -translate-x-20 -translate-y-15 float-animation-delayed"
                        // style={{ animation: 'floatUpDown 2s ease-in-out infinite'}}
                    />

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
        </div>
    )
}

export default SignupPage