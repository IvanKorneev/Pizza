import {
    calcMinutesLeft,
    formatCurrency,
    formatDate,
} from "../../utils/helpers";
import {getOrder} from "../../services/apiRestaurant.js";
import {useLoaderData} from "react-router-dom";
import OrderItem from "./OrderItem.jsx";


const Order = () => {
    const order = useLoaderData();
    // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
    const {
        id,
        status,
        priority,
        priorityPrice,
        orderPrice,
        estimatedDelivery,
        cart,
    } = order;
    const deliveryIn = calcMinutesLeft(estimatedDelivery);

    return (
        <div className='px-4 py-6 space-y-8'>
            <div className='flex items-center justify-between flex-wrap'>
                <h2 className='text-xl font-semibold'>Order * {id} status </h2>
                <div className='space-x-2'>
                    {priority && <span
                        className='bg-red-500 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50'>Priority</span>}
                    <span
                        className='bg-green-500 rounded-full px-3 py-1 text-sm font-semibold uppercase tracking-wide text-red-50'>{status} order</span>
                </div>
            </div>

            <div className='flex items-center justify-between flex-wrap gap-2 bg-stone-200 py-5 px-6'>
                <p className='font-medium'>
                    {deliveryIn >= 0
                        ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
                        : "Order should have arrived"}
                </p>
                <p className='text-xs text-stone-500'>(Estimated delivery: {formatDate(estimatedDelivery)})</p>
            </div>
            <ul className='divide-y divide-stone-200 border-b border-t'>
                {cart.map((item) => (<OrderItem item={item} key={item.pizzaId}/>))}
            </ul>
            <div className='space-y-2 bg-stone-200 px-6 py-5'>
                <p className='text-sm font-medium text-stone-600'>Price pizza: {formatCurrency(orderPrice)}</p>
                {priority && <p className='text-sm font-medium text-stone-600'>Price
                    priority: {formatCurrency(priorityPrice)}</p>}
                <p className=' font-medium text-stone-800'>To pay on
                    delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
            </div>
        </div>
    );
}

export const loader = async ({params}) => {
    const order = await getOrder(params.orderId)
    return order
}
export default Order;