import React from "react"
import { Link } from "react-router-dom"
import duckLogo from '../assets/YapYapLogo_notext.png';

const Navbar = () => {
    return(
        <nav className="bg-amber-400 px-10 py-2">
            <div className="w-full mx-auto flex items-center">
                <div className="flex">
                    <img src={duckLogo} alt="duck logo" className="h-12 w-12 mr-2"></img>
                </div>
                <div className="flex-1 text-center">
                    <h1 className="text-2xl font-bold text-amber-50">YapYap!</h1>
                </div>
                <div className="space-x-4">
                    <Link to="/support" className="text-white hover:text-amber-50 font-bold">SUPPORT</Link>
                    <Link to="/bftw" className="text-white hover:text-amber-50 font-bold">BFTW</Link>
                    <Link to="/about" className="text-white hover:text-amber-50 font-bold">ABOUT US</Link>
                </div>
            </div>
        </nav>
    )
}

export default Navbar