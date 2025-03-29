import React, { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)

    const toggleMenu = () => {
        setIsOpen(!isOpen)
    }

    return(
        <nav className="bg-amber-400 px-10 py-2">
            <div className="w-full mx-auto flex items-center justify-between">
                
                {/* LOGO */}
                <div className="flex">
                    <img src="/YapYapLogo.svg" alt="duck logo" className="h-12 w-12 mr-2"></img>
                </div>
                
                {/* NAME */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <h1 className="text-2xl font-bold text-amber-50">YapYap!</h1>
                </div>

                {/* LINKS BUTTONS DESKTOP*/}
                <div className="hidden md:flex gap-4 ml-auto">
                    <button 
                        className='
                            bg-amber-400 text-white px-6 py-3 w-32 h-12 
                            hover:shadow-lg hover:bg-amber-500 
                            transition-transform transform
                            duration-300 rounded-3xl
                            '
                    ><Link to="/support" className="text-white hover:text-amber-50 font-bold">SUPPORT</Link>
                    </button>
                    
                    <button 
                        className='
                            bg-amber-400 text-white px-6 py-3 w-32 h-12
                            hover:shadow-lg hover:bg-amber-500 
                            transition-transform transform
                            duration-300 rounded-3xl
                            '
                    ><Link to="/bftw" className="text-white hover:text-amber-50 font-bold">BFTW</Link>
                    </button>
                    
                    <button 
                        className='
                            bg-amber-400 text-white px-6 py-3 w-32 h-12
                            hover:shadow-lg hover:bg-amber-500 
                            transition-transform transform
                            duration-300 rounded-3xl
                            '
                    ><Link to="/about" className="text-white hover:text-amber-50 font-bold">ABOUT US</Link>
                    </button>
                </div>

                {/* MOBILE VIEW */}
                <div className="md:hidden flex justify-end"> 
                    <button onClick={toggleMenu} className="text-white focus:outline-none ">
                        {/* Hamburger Icon */}
                        <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    </button>
                </div>
            </div>

            

            {/* MOBILE MENU LINKS */}
            {isOpen && (
                <div className="md:hidden flex flex-col gap-2 mt-2">
                    <Link 
                        to="/support" 
                        className="block bg-amber-400 rounded-3xl text-white px-6 py-3 hover:shadow-lg transition-transform duration-300 font-bold hover:text-amber-50 text-center hover:bg-amber-500">
                        SUPPORT
                    </Link>
                    <Link 
                        to="/bftw" 
                        className="block bg-amber-400 rounded-3xl text-white px-6 py-3 hover:shadow-lg transition-transform duration-300 font-bold hover:text-amber-50 text-center hover:bg-amber-500">
                        BFTW
                    </Link>
                    <Link 
                        to="/about" 
                        className="block bg-amber-400 rounded-3xl text-white px-6 py-3 hover:shadow-lg transition-transform duration-300 font-bold hover:text-amber-50 text-center hover:bg-amber-500">
                        ABOUT US
                    </Link>
                </div>
            )}
        </nav>
    )
}

export default Navbar