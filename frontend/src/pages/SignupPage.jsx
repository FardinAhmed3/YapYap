import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from "../components/Navbar"
import SignUpForm from "../components/SignUpForm"

const SignupPage = () => {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [dob, setDob] = useState("")
  const [gender, setGender] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL

  const validateForm = () => {
    if (!firstName || !lastName || !username || !email || !password || !dob || !gender) {
      setError('All fields are required')
      return false
    }
    setError('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return
    setLoading(true)
    const payload = {
      first_name: firstName,
      last_name: lastName,
      username,
      email,
      password,
      date_of_birth: dob,
      gender
    }
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, payload, {
        headers: { 'Content-Type': 'application/json' }
      })
      setLoading(false)
      navigate('/')
    } catch (err) {
      setLoading(false)
      setError(err.response?.data?.detail || 'An error occurred. Please try again.')
      console.error(err)
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
            error={error}
            loading={loading}
          />
        </div>
      </div>
    </>
  )
}

export default SignupPage
