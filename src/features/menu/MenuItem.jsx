import {formatCurrency} from "../../utils/helpers.js";
import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {addItem, getCurrentQuantityById} from "../cart/cartSlice.js";
import DeleteItem from "../cart/DeleteItem.jsx";

const MenuItem = ({pizza}) => {

    const {id, name, unitPrice, ingredients, soldOut, imageUrl} = pizza;
    const dispatch = useDispatch();
    const currentQuantity = useSelector(getCurrentQuantityById(id));
    const isInCart = currentQuantity > 0

    const handleAddToCart = () => {
        const newItem = {pizzaId: id, name, quantity: 1, unitPrice, totalPrice: unitPrice * 1}
        dispatch(addItem(newItem))
    }

    return (
        <li key={id} className='flex gap-4 py-2 '>
            <img src={imageUrl} alt={name} className={`h-24 ${soldOut ? 'grayscale opacity-70' : ''}`}/>
            <div className='flex flex-col flex-grow'>
                <p className='font-medium'>{name}</p>
                <p className='text=sm italic text-stone-500'>{ingredients.join(', ')}</p>
                <div className='mt-auto flex items-center justify-between '>
                    {isInCart &&  <DeleteItem pizzaId={id}/>}
                    {!soldOut ? <p className='text-sm'>{formatCurrency(unitPrice)}</p> :
                        <p className='text-sm font-medium uppercase text-stone-500'>Sold out</p>}
                    {!soldOut && ! isInCart && <Button type='small' onClick={handleAddToCart}>Add to cart </Button>}
                </div>
            </div>
        </li>
    );
}

export default MenuItem;