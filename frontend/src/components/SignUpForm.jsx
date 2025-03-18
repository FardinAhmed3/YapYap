import InputField from "./InputField"

const SignUpForm = ({
    onSubmit,
    firstName, setFirstName,
    lastName, setLastName,
    username, setUsername,
    email, setEmail,
    password, setPassword,
    // confirmPassword, setConfirmPassword,
    dob, setDob,
    gender, setGender
}) =>{
    return (
        <form 
            onSubmit={onSubmit}
            className="mt-4 p-6 w-[320px] z-50"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Create Your Yap Account</h2>

            <InputField 
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
            />

            <InputField 
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
            />

            <InputField 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <InputField 
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <InputField 
                type="text"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />

            <InputField 
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
            />

            <select
                value={gender}
                placeholder="Select Gender"
                onChange={(e) => setGender(e.target.value)}
                className="
                    w-full border border-gray-300 rounded-md px-3 py-2 mb-4
                    focus:outline-none focus:ring-amber-400
                "
            >
                <option value="" disabled></option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>

            <button 
                type="submit"
                className="
                    w-full bg-amber-400 text-white py-2 rounded-md 
                    hover:bg-amber-500 transition duration-300
                "
            >
                <h1 className="font-bold text-xl">
                    Sign Up
                </h1>
            </button>
            
        </form>
    )
}

export default SignUpForm