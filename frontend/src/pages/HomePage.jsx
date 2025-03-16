import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import duckLogo from '../assets/YapYapLogo_notext.png'
import LogoCenter from '../components/LogoCenter'
import LoginForm from '../components/LoginForm'
import LoginButton from '../components/LoginButton'
import SignupButton from '../components/SignupButton'

const HomePage = () => {
    const [showForm, setShowForm] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Email: ${email}, Password: ${password}`)
    }

    return (
    <>
        {/* Navigation Bar */}
        <Navbar />

        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-8 space-y-6">

                {/* LOGO in Center with Transition */}
                <LogoCenter src={duckLogo} alt={"duckLogo"} />

                {/* Login Button + Signup Message */}
                {showForm ? (
                    <LoginForm
                        onSubmit={handleSubmit}
                        email={email}
                        setEmail={setEmail}
                        password={password}
                        setPassword={setPassword}
                    />
                ) : (
                    <LoginButton 
                            text="LOGIN" 
                            onClick={() => setShowForm(true)} 
                            className="bg-amber-400 text-white hover:bg-amber-500 mt-12"
                    />
                )}

                {/* Signup Message */}
                <h1>Don't have an account?</h1>
                <SignupButton
                    text="SIGNuP"
                    onClick={() => setShowForm(true)}
                />
            </div>
        </div>

    </>
  )
}

export default HomePage