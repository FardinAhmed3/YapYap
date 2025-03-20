const SignupButton = ({text, onClick, className}) => {
    return(
        <button 
            onClick={onClick}
            className={`text-black
                        transition-transform transform hover:scale-105
                        duration-300`}
        >
            <h1 className='font-bold'>{text}</h1>
        </button>

    )
}

export default SignupButton