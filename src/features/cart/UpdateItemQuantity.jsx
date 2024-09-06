import Button from "../../ui/Button.jsx";
import {useDispatch} from "react-redux";

import {decreaseItemQuantity, increaseItemQuantity} from "./cartSlice.js";

const UpdateItemQuantity = ({pizzaId,currentQuantity}) => {
    const dispatch = useDispatch();


    const onIncreaseItemQuantity = ()=>{

        dispatch(increaseItemQuantity(pizzaId))

    }
    const onDecreaseItemQuantity = ()=>{
        dispatch(decreaseItemQuantity(pizzaId));

    }
    return(
        <div className='flex gap-2 items-center mb:gap-3'>
            <Button type='round' onClick={onDecreaseItemQuantity}>-</Button>
            <span className='text-sm font-medium'>{currentQuantity}</span>
            <Button type='round' onClick={onIncreaseItemQuantity}>+</Button>
        </div>
    );
 };
export default UpdateItemQuantity;