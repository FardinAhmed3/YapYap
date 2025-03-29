import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import duckLogo from '../assets/YapYapLogo_notext.png'
import LogoCenter from '../components/LogoCenter'
import LoginForm from '../components/LoginForm'
import LoginButton from '../components/LoginButton'
import SignupButton from '../components/SignupButton'

const HomePage = () => {
    const navigate = useNavigate()

    const [showForm, setShowForm] = useState(false)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        const verifyTokenAndFetchUser = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                return
            }

            try {
                await axios.get(`http://localhost:8000/verify-token/${token}`)
                await axios.get('http://localhost:8000/me', {
                    headers: { Authorization: `Bearer ${token}` },
                })
                navigate('/dashboard')
            } catch {
                localStorage.removeItem('token')
            }
        }

        verifyTokenAndFetchUser()
    }, [navigate])

    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`Email: ${email}, Password: ${password}`)
    }

    return (
        <>
            <div>
                <Navbar />
            </div>

            <div className="container mx-auto p-4">
                <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-8 space-y-6">
                    <LogoCenter src="/YapYapLogo.svg" alt={"duckLogo"} />

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
                    
                    <div className='flex flex-row items-center justify-center space-x-2'> 
                        <h1>Don't have an account?</h1>
                        <SignupButton
                            text="SignUp"
                            onClick={() => navigate('/signup')}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
