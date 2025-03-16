const SignupButton = ({text, onClick, className}) => {
    return(
        <button 
            onClick={onClick}
            className={`text-black
                        transition-transform transform hover:scale-105
                        duration-300 mt-12  `}
        >
            <h1 className='font-bold text-2xl'>{text}</h1>
        </button>

    )
}

export default SignupButton