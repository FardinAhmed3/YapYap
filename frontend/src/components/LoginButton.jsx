const LoginButton = ({text, onClick, className}) => {
    return(
        <button 
            onClick={onClick}
            
            className={` bg-amber-400 text-white px-10 py-5
                        rounded-3xl shadow-md
                        hover:bg-amber-400 hover:shadow-lg
                        transition-transform transform hover:scale-105
                        duration-300 mt-12  `}
        >
            <h1 className='font-bold text-2xl'>{text}</h1>
        </button>

    )
}

export default LoginButton