import {Link} from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder.jsx";
import UserName from "../features/user/UserName.jsx";

const Header = () => {
    return (
        <header className=' font-pizza bg-yellow-400 uppercase px-4 py-3 border-b border-stone-200 sm:px-6 flex items-center justify-around'>
            <Link to='/' className='tracking-widest'>Fast Pizza co.il</Link>
            <SearchOrder/>
            <UserName/>
        </header>
    );
};
export default Header;