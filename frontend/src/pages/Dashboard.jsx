import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserProfile from '../components/UserProfile';

export const Dashboard = () => {
    const [username, setUsername] = useState('');
    const [showProfile, setShowProfile] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyTokenAndFetchUser = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/');
                return;
            }

            try {
                const verifyResponse = await fetch(`http://localhost:8000/verify-token/${token}`);
                if (!verifyResponse.ok) {
                    throw new Error('Token verification failed');
                }

                const meResponse = await fetch('http://localhost:8000/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (!meResponse.ok) {
                    throw new Error('Failed to fetch user info');
                }

                const data = await meResponse.json();
                setUsername(data.username);
            } catch {
                localStorage.removeItem('token');
                navigate('/');
            }
        };

        verifyTokenAndFetchUser();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/');
    };

    return (
        <div className="bg-amber-400 min-h-screen flex flex-col items-center justify-center space-y-6">
            <h1 className="text-4xl text-center font-semibold text-gray-800">
                Welcome, <span className="text-blue-600">{username}</span>
            </h1>
            <h2 className="text-2xl text-center text-gray-700">
                This is a protected page. Only visible to auth users.
            </h2>

            <button
                onClick={() => setShowProfile((prev) => !prev)}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
            >
                User Profile
            </button>

            {showProfile && <UserProfile />}

            <button
                onClick={handleLogout}
                className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;