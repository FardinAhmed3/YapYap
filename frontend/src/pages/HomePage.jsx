import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import duckLogo from '../assets/YapYapLogo_notext.png'
import LogoCenter from '../components/LogoCenter'

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
    <Navbar />
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-8 space-y-6">

                {/* LOGO in Center with Transition */}
                <LogoCenter src={duckLogo} alt={"duckLogo"} />

                {/* Login Button + Signup Message */}
                <button 
                    onClick={() => setShowForm(!showForm)}
                    className='
                        bg-amber-400 text-white px-10 py-5
                        rounded-3xl shadow-md
                        hover:bg-amber-400 hover:shadow-lg
                        transition-transform transform hover:scale-105
                        duration-300 mt-12  
                        '
                >
                    <h1 className='font-bold text-2xl'>LOGIN</h1>
                </button>

                <h1 className='font-sans'>Or Signup Here</h1>
            </div>
        </div>

        {/* Login Form */}
        {showForm && (
            <form 
            onSubmit={handleSubmit}
            className="absolute right-10 mt-4 p-6 w-[320px] z-50"
            >
                <h2 className='text-xl font-bold mb-4'>Login</h2>

                {/* Email/Username Field */}
                <input 
                        type="text"
                        placeholder="Email or Username"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="
                            w-full border border-gray-300 rounded-md px-3 py-2 mb-4 
                            focus:outline-none focus:ring-2 focus:ring-amber-400
                        "
                    />

                    {/* Password Field */}
                    <input 
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="
                            w-full border border-gray-300 rounded-md px-3 py-2 mb-4 
                            focus:outline-none focus:ring-2 focus:ring-amber-400
                        "
                        />

                    {/* Submit Button */}
                    <button 
                        type="submit"
                        className="
                            w-full bg-amber-400 text-white py-2 rounded-md 
                            hover:bg-amber-500 transition duration-300
                        "
                    >
                        Sign In
                    </button>
            </form>
        )}
    </>
  )
}

export default HomePage