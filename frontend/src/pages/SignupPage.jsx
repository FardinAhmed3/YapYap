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

<<<<<<< Updated upstream
  const handleSubmit = async (e) => {
    e.preventDefault()

    const userData = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
      date_of_birth: dob,
      gender,
    }

    try {
      const { data } = await axios.post("http://127.0.0.1:8000/users/", null, { params: userData })
      alert(`Signed up successfully! User ID: ${data.username}`)
    } catch (error) {
      console.error("Error:", error)
      alert("Signup failed: " + (error.message))
    }
  }

  return (
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
=======
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
>>>>>>> Stashed changes
}

export default SignupPage