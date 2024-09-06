import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getTotalCertPrice, getTotalCertQuantity} from "./cartSlice.js";
import {formatCurrency} from "../../utils/helpers.js";

const CartOverview = () => {
    const totalCartQuantity = useSelector(getTotalCertQuantity)
    const totalCartPrice = useSelector(getTotalCertPrice)
    
    if(!totalCartQuantity) return null

    return (
        <div className='bg-stone-800 text-stone-200 uppercase p-4 sm:px-6 px-4
         py-4 text-sm md:twxt-base flex items-center justify-between'>
            <p className='text-stone-300 font-semibold space-x-4 sm:space-x-6'>
                <span>{totalCartQuantity} pizzas</span>
                <span>${formatCurrency(totalCartPrice)}</span>
            </p>
            <Link to='/cart'> To open cart &rarr;</Link>
        </div>
    );
}

export default CartOverview;