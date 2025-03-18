import React from "react"
import { Link } from "react-router-dom"
import duckLogo from '../assets/YapYapLogo_notext.png'

const Navbar = () => {
    return(
        <nav className="bg-amber-400 px-10 py-2">
            <div className="w-full mx-auto flex items-center">
                
                {/* LOGO */}
                <div className="flex">
                    <img src="/YapYapLogo.svg" alt="duck logo" className="h-12 w-12 mr-2"></img>
                </div>
                
                {/* NAME */}
                <div className="absolute left-1/2 -translate-x-1/2">
                    <h1 className="text-2xl font-bold text-amber-50">YapYap!</h1>
                </div>

                {/* LINKS BUTTONS */}
                <div className="flex gap-4 ml-auto">
                    <button 
                        className='
                            bg-amber-400 text-white px-6 py-3 w-32 h-12
                            hover:shadow-lg
                            transition-transform transform
                            duration-300
                            '
                    ><Link to="/support" className="text-white hover:text-amber-50 font-bold">SUPPORT</Link>
                    </button>
                    <button 
                        className='
                            bg-amber-400 text-white px-6 py-3 w-32 h-12
                            hover:shadow-lg
                            transition-transform transform
                            duration-300
                            '
                    ><Link to="/bftw" className="text-white hover:text-amber-50 font-bold">BFTW</Link>
                    </button>
                    <button 
                        className='
                            bg-amber-400 text-white px-6 py-3 w-32 h-12
                            hover:shadow-lg
                            transition-transform transform
                            duration-300
                            '
                    ><Link to="/about" className="text-white hover:text-amber-50 font-bold">ABOUT US</Link>
                    </button>
                </div>

                {/* MORE STUFF? */}
            </div>
        </nav>
    )
}

export default Navbar