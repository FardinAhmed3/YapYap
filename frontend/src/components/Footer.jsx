import { Link } from "react-router-dom"

const Footer = () => {
    return(
        <>
        <div className="flex flex-row justify-center h-full w-full bg-linear-to-b from-amber-400 via-amber-500 to-amber-600">

            <div>
                <img src="/YapYapLogo.svg" className="h-50 w-50 m-10"/>
            </div>

            <div className="text-white font-bold text-2xl m-20 flex flex-wrap gap-10">
                <Link to="/download" className="hover:underline">Download</Link>
                <Link to="/support" className="hover:underline">Help & Support</Link>
                <Link to="/feedback" className="hover:underline">Feedback</Link>
                <Link to="/about" className="hover:underline">About Us</Link>
                <Link to="/tos" className="hover:underline">Terms of Service</Link>
            </div>

            
        </div>
        </>
    )
}

export default Footer