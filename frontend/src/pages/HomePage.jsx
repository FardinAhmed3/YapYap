import React from 'react'
import Navbar from '../components/Navbar'
import duckLogo from '../assets/YapYapLogo_notext.png';

const HomePage = () => {
  return (
    <>
    <Navbar />
        <div className="container mx-auto p-4">
            <div className="flex flex-col items-center justify-center h-[calc(100vh-80px)] px-8 space-y-6">
                <img 
                    src={duckLogo} 
                    alt="duck logo" 
                    className="h-60 w-60 transition-transform duration-300 hover:scale-125 relative -top-5" />

                <button 
                    className='
                        bg-amber-400 text-white px-6 py-3
                        rounded-lg shadow-md
                        hover:bg-amber-500 hover:shadow-lg
                        transition-transform transform hover:scale-105
                        duration-300
                        '
                >LOGIN
                </button>

                <h1 className='font-sans'>Or Signup Here</h1>
            </div>
        </div>
    </>
  )
}

export default HomePage