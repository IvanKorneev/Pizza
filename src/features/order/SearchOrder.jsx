import {useState} from "react";
import {useNavigate} from "react-router-dom";

const SearchOrder = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();
    const handelSubmit = (e) => {
        e.preventDefault();
        if(!query) return
        navigate(`/order/${query}`)
        setQuery("")
    }
    return (
        <form onSubmit={handelSubmit}>
            <input className='rounded-full px-4 py-2 text-sm bg-yellow-100 place-content-baseline:text-stone-400 w-28 sm:w-64 sm:focus:w-72 transition-all duration-300 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-opacity-50' placeholder="Search order #"
                   value={query} onChange={e => setQuery(e.target.value)}/>
        </form>
    );
};
export default SearchOrder