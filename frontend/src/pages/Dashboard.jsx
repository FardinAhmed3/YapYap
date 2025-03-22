import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import axios from 'axios';
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
                await axios.get(`https://api.fardinahmed.com/verify-token/${token}`);
                const meResponse = await axios.get('https://api.fardinahmed.com/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsername(meResponse.data.username);
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

    const duckCount = 20;
    const ducks = Array.from({ length: duckCount }, (_, index) => (
        <motion.img
            key={index}
            src="/YapYapLogo_notext.png"
            alt="duck"
            className="absolute w-12 h-12 opacity-30 pointer-events-none"
            initial={{ y: '100vh', rotate: 0 }}
            animate={{ y: -100, rotate: 360 }}
            transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: 'linear',
            }}
            style={{ left: `${Math.random() * 100}%` }}
        />
    ));

    return (
        <div className="relative bg-amber-400 min-h-screen flex flex-col items-center justify-center space-y-6 overflow-hidden">
            <div className="absolute inset-0 z-0">{ducks}</div>

            <div className="relative z-10 flex flex-col items-center space-y-6">
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
                <button
                    onClick={() => navigate("/chat")}
                    className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 transition"
                >
                    Chat
                </button>


                <AnimatePresence>
                    {showProfile && (
                        <motion.div
                            key="profile"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                        >
                            <UserProfile />
                        </motion.div>
                    )}
                </AnimatePresence>

                <button
                    onClick={handleLogout}
                    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
