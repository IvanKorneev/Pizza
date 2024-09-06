import {Link, useNavigate} from "react-router-dom";

const LinkButton = ({children, to}) => {
    const navigate = useNavigate();
    const className = 'text-sm text-blue-500 hover:text-blue-600'
    if(to ==='-1') return <button className={className} onClick={()=>navigate(-1)}>{children}</button>
    return (
        <button>
            <Link to={to} className={className}>&larr; {children}</Link>
        </button>
    );
};
export default LinkButton;