const LoginForm = ({onSubmit, email, setEmail, password, setPassword}) => {
    return(
        <form
            onSubmit={onSubmit}
            className="mt-4 p-6 w-[320px] z-50"
        >
            <h2 className='text-xl font-bold mb-4 text-center'>Sign In To Your Account</h2>

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
                <h1 className="font-bold text-xl">
                    Start Yapping!
                </h1>
            </button>
        </form>
    )
}

export default LoginForm