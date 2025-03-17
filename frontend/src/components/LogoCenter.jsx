const LogoCenter = ({src, alt}) => {
    return (
        <div className="flex justify-center items-center w-full">
            <img
                src={src}
                alt={alt}
                className="h-80 w-80 transition-transform duration-300 hover:scale-125"
            />
        </div>
    )
}

export default LogoCenter