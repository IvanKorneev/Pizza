import CreateUser from "../features/user/CreateUser.jsx";
import {useSelector} from "react-redux";
import Button from "./Button.jsx";

const Home = () => {
    const userName = useSelector(state => state.user.userName);

    return (
        <div className='my-10 sm:my-16 text-center px-4'>
            <h1 className=" mb-8 text-center text-xl font-semibold mb:text-3xl">
                The best pizza.
                <br/>
                <span className=' text-yellow-500'>Straight out of the oven, straight to you.</span>
            </h1>
            {userName === '' ? (<CreateUser/>) : (<Button to='/menu' type='primary'>Continue ordering ,{userName}</Button>)}
        </div>
    );
}

export default Home;