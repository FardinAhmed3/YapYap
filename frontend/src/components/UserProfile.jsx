import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UserProfile = () => {
    const [userData, setUserData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('token')
                if (!token) {
                    setError('No token found')
                    setLoading(false)
                    return
                }
                const response = await axios.get('http://localhost:8000/me', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                setUserData(response.data)
            } catch (err) {
                setError('Failed to fetch user data')
            } finally {
                setLoading(false)
            }
        }
        fetchUserData()
    }, [])

    if (loading) return <div className="text-center text-gray-500">Loading...</div>
    if (error) return <div className="text-center text-red-500">{error}</div>

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-amber-300 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">User Profile</h2>
            <div className="space-y-2">
                <p><strong>Username:</strong> {userData.username}</p>
                <p><strong>Name:</strong> {userData.first_name} {userData.last_name}</p>
                <p><strong>Email:</strong> {userData.email}</p>
                <p><strong>Gender:</strong> {userData.gender}</p>
                <p><strong>Date of Birth:</strong> {userData.date_of_birth}</p>
                <p><strong>Account Created:</strong> {new Date(userData.date_created).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default UserProfile