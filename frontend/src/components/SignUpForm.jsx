import InputField from "./InputField"
import { useState, useEffect } from "react"

const SignUpForm = ({
    onSubmit,
    firstName, setFirstName,
    lastName, setLastName,
    username, setUsername,
    email, setEmail,
    password, setPassword,
    dob, setDob,
    gender, setGender
}) => {
    const [errors, setErrors] = useState({})
    const [isFormValid, setIsFormValid] = useState(false)
    const [touched, setTouched] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const calculateAge = (birthDate) => {
        const today = new Date()
        const birth = new Date(birthDate)
        let age = today.getFullYear() - birth.getFullYear()
        const monthDiff = today.getMonth() - birth.getMonth()
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--
        }
        
        return age
    }

    const validateForm = () => {
        const newErrors = {}

        if (!firstName.trim()) {
            newErrors.firstName = "First name is required"
        }

        if (!lastName.trim()) {
            newErrors.lastName = "Last name is required"
        }

        if (!username.trim()) {
            newErrors.username = "Username is required"
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!email.trim()) {
            newErrors.email = "Email is required"
        } else if (!emailRegex.test(email)) {
            newErrors.email = "Please enter a valid email address"
        }

        if (!password) {
            newErrors.password = "Password is required"
        } else if (password.length < 6) {
            newErrors.password = "Password must be at least 6 characters"
        }

        if (!dob) {
            newErrors.dob = "Date of birth is required"
        } else {
            const age = calculateAge(dob)
            if (age < 13) {
                newErrors.dob = "You must be at least 13 years old"
            }
        }

        if (!gender) {
            newErrors.gender = "Please select your gender"
        }

        setErrors(newErrors)
        setIsFormValid(Object.keys(newErrors).length === 0)
    }

    useEffect(() => {
        if (Object.keys(touched).length > 0 || isSubmitting) {
            validateForm()
        }
    }, [firstName, lastName, username, email, password, dob, gender, touched, isSubmitting])

    const handleBlur = (field) => {
        setTouched(prev => ({ ...prev, [field]: true }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (isFormValid) {
            onSubmit(e)
        }
    }

    const getFieldError = (field) => {
        return (touched[field] || isSubmitting) ? errors[field] : ""
    }

    return (
        <form 
            onSubmit={handleSubmit}
            className="mt-4 p-6 w-[320px] z-50"
        >
            <h2 className="text-2xl font-bold text-center mb-4">Create Your Yap Account</h2>

            <InputField 
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                onBlur={() => handleBlur('firstName')}
                error={getFieldError('firstName')}
                label="First Name"
            />

            <InputField 
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                onBlur={() => handleBlur('lastName')}
                error={getFieldError('lastName')}
                label="Last Name"
            />

            <InputField 
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => handleBlur('username')}
                error={getFieldError('username')}
                label="Username"
            />

            <InputField 
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => handleBlur('email')}
                error={getFieldError('email')}
                label="Email"
            />

            <InputField 
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => handleBlur('password')}
                error={getFieldError('password')}
                label="Password"
            />

            <InputField 
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                onBlur={() => handleBlur('dob')}
                error={getFieldError('dob')}
                label="Date of Birth"
            />

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                </label>
                <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    onBlur={() => handleBlur('gender')}
                    className={`
                        w-full border rounded-md px-3 py-2
                        focus:outline-none focus:ring-2 focus:ring-amber-400
                        ${getFieldError('gender') ? 'border-red-500' : 'border-gray-300'}
                    `}
                >
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Non-Binary">Non-Binary</option>
                </select>
                {getFieldError('gender') && (
                    <p className="text-red-500 text-sm mt-1">{getFieldError('gender')}</p>
                )}
            </div>

            <button 
                type="submit"
                disabled={!isFormValid}
                className={`
                    w-full py-2 rounded-md transition duration-300
                    ${isFormValid 
                        ? 'bg-amber-400 text-white hover:bg-amber-500' 
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    }
                `}
            >
                <h1 className="font-bold text-xl">
                    Sign Up
                </h1>
            </button>
        </form>
    )
}

export default SignUpForm