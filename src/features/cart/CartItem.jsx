import {formatCurrency} from "../../utils/helpers.js";

import DeleteItem from "./DeleteItem.jsx";
import UpdateItemQuantity from "./UpdateItemQuantity.jsx";
import {useSelector} from "react-redux";
import {getCurrentQuantityById} from "./cartSlice.js";

const CartItem = ({item}) => {

    const {pizzaId, name, quantity, totalPrice} = item;
    const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

    return (
        <li className='py-3 sm:items-center sm:justify-between'>
            <p className='mb-1 sm:mb-0'>
                {quantity}&times; {name}
            </p>
            <div className='flex items-center justify-end sm:gap-6'>
                <p className='text-s, font-bold'>{formatCurrency(totalPrice)}</p>
                <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={pizzaId}/>
            </div>
        </li>
    );
}

export default CartItem;