import { Link } from "react-router-dom";

const SupportBox = ({page, title, desc}) => {
    return (
        <>
        <Link to={page}>
        <div className="rounded-3xl w-64 h-auto text-amber-400 bg-white shadow-lg p-6 text-center hover:bg-amber-500 hover:scale-105 hover:shadow-2xl hover:text-white transition-all duration-200">
            <h1 className="font-bold text-2xl mb-2">{title}</h1>
            <h2 className="text-gray-700">{desc}</h2>
        </div>
        </Link>
        </>
    );
};

export default SupportBox;
