import {useState} from 'react';
import Button from "../../ui/Button.jsx";
import {useDispatch} from "react-redux";
import {updateName} from "./userSlice.js";
import {useNavigate} from "react-router-dom";

const CreateUser = () => {
    const [userName, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        if(!userName) return;
        dispatch(updateName(userName))
        navigate('/menu')
    }

    return (
        <form onSubmit={handleSubmit}>
            <p className='mb-4 text-sm text-stone-600 md:text-base'>👋 Welcome! Please start by telling us your name:</p>

            <input
                type="text"
                placeholder="Your full name"
                value={userName}
                className='input w-72 mb-8'
                onChange={(e) => setUsername(e.target.value)}
            />

            {userName !== '' && (
                <div>
                    <Button type='primery'>
                        Start ordering
                    </Button>
                </div>
            )}
        </form>
    );
}

export default CreateUser;