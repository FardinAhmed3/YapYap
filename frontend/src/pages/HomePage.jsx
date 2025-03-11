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
                    className="h-80 w-80 transition-transform duration-300 hover:scale-125 relative -top-5" />

                <button 
                    className='
                        bg-amber-400 text-white px-10 py-5
                        rounded-4xl shadow-md
                        hover:bg-amber-450 hover:shadow-lg
                        transition-transform transform hover:scale-105
                        duration-300 mt-12  
                        '
                >
                    <h1 className='font-bold text-2xl'>LOGIN</h1>
                </button>

                <h1 className='font-sans'>Or Signup Here</h1>
            </div>
        </div>
    </>
  )
}

export default HomePage