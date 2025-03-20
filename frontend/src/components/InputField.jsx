const InputField = ({type, placeholder, value, onChange}) => {
    return(
        <input
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 mb-4 
                    focus:outline-none focus:ring-2 focus:ring-amber-400"
        />
    )
}

export default InputField