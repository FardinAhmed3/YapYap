const InputField = ({type, placeholder, value, onChange, error, label, onBlur}) => {
    return(
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">
                {label}
            </label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                className={`
                    w-full border rounded-md px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-amber-400
                    ${error ? 'border-red-500' : 'border-gray-300'}
                `}
            />
            {error && (
                <p className="text-red-500 text-sm mt-1">{error}</p>
            )}
        </div>
    )
}

export default InputField