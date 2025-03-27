import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const LoginForm = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!username || !password) {
            setError("Username and password are required")
            return
        }
        setLoading(true)
        setError("")

        const formDetails = new URLSearchParams()
        formDetails.append("username", username)
        formDetails.append("password", password)

        try {
            const response = await axios.post("http://localhost:8000/token", formDetails, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            })

            localStorage.setItem("token", response.data.access_token)
            navigate("/Dashboard")
        } catch (err) {
            if (err.response && err.response.data && err.response.data.detail) {
                setError(err.response.data.detail)
            } else {
                setError("An error occurred. Please try again.")
            }
        } finally {
            setLoading(false)
        }
    }

    return(
        <form
            onSubmit={handleSubmit}
            className="mt-4 p-6 w-[320px] z-50"
        >
            <h2 className='text-xl font-bold mb-4 text-center'>Sign In To Your Account</h2>

            <input
                type="text"
                placeholder="Email or Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="
                    w-full border border-gray-300 rounded-2xl px-3 py-2 mb-4 
                    focus:outline-none focus:ring-2 focus:ring-amber-400
                "
            />

            <input 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="
                    w-full border border-gray-300 rounded-2xl px-3 py-2 mb-4 
                    focus:outline-none focus:ring-2 focus:ring-amber-400
                "
            />

            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}

            <button 
                type="submit"
                className="
                    w-full bg-amber-400 text-white py-2 rounded-2xl
                    hover:bg-amber-500 transition duration-300
                "
                disabled={loading}
            >
                <h1 className="font-bold text-xl">
                    {loading ? "Logging in..." : "Start Yapping!"}
                </h1>
            </button>
        </form>
    )
}

export default LoginForm