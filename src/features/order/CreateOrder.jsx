// https://uibakery.io/regex-library/phone-number
// const isValidPhone = (str) =>
//     /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
//         str
//     );

import {Form, redirect, useActionData, useNavigation} from "react-router-dom";
import {useState} from "react";
import {createOrder} from "../../services/apiRestaurant.js";
import Button from "../../ui/Button.jsx";
import {useDispatch, useSelector} from "react-redux";
import {clearCart, getCart} from "../cart/cartSlice.js";
import EmptyCart from "../cart/EmptyCart.jsx";
import store from "../../store.js";
import {fetchAddress} from "../user/userSlice.js";

const isValidPhone = (str) =>
    /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
        str
    );


const CreateOrder = () => {
    const navigation = useNavigation()
    const isSubmitting = navigation.state === 'submitting';
    const [withPriority, setWithPriority] = useState(false);
    const formErrors = useActionData()
    const dispatch = useDispatch();
    const {userName, status: addressStatus, position, address} = useSelector(state => state.user);
    const isLoadingAddress = addressStatus === 'Loading'
    const cart = useSelector(getCart);
    if (!cart.length) return <EmptyCart/>;


    return (
        <div className='px-4 py-6'>
            <h2 className='text-xl font-semibold mb-8'>Ready to order? go!</h2>


            <Form method="POST">
                <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center '>
                    <label className='sm:basis-40'>First Name</label>
                    <input type="text" name="customer" required className='input w-full' defaultValue={userName}/>
                </div>

                <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
                    <label className='sm:basis-40'>Phone number</label>
                    <div className='grow'>
                        <input type="tel" name="phone" required className='input w-full'/>
                    </div>
                    {formErrors?.phone && <p>{formErrors.phone}</p>}
                </div>

                <div className='mb-5 flex gap-2 flex-col sm:flex-row sm:items-center'>
                    <label className='sm:basis-40'>Address</label>
                    <div className='grow'>
                        <input type="text" name="address" required className='input w-full' disabled={isLoadingAddress} defaultValue={address}/>
                    </div>
                    <Button type='small' disabled={isLoadingAddress} onClick={(e) => {
                        e.preventDefault()
                        dispatch(fetchAddress())
                    }}>Get Address</Button>
                </div>

                <div className='mb-12 flex gap-5 items-center'>
                    <input
                        className='h-6 w-6 accent-yellow-400 focus:ring-yellow-400 focus:ring-offset-2'
                        type="checkbox"
                        name="priority"
                        id="priority"
                        value={withPriority}
                        onChange={(e) => setWithPriority(e.target.checked)}
                    />
                    <label className='font-medium' htmlFor="priority">Want to yo give your order priority?</label>
                </div>

                <div>
                    <input type="hidden" name="cart" value={JSON.stringify(cart)}/>
                    <Button type='primary'
                            disabled={isSubmitting}>{isSubmitting ? "Placing order..." : "Order now"}</Button>
                </div>
            </Form>
        </div>
    );
}

export const action = async ({request}) => {
    const formData = await request.formData();
    const data = Object.fromEntries(formData)
    const order = {
        ...data,
        cart: JSON.parse(data.cart),
        priority: data.priority === 'on'
    }
    const errors = {}
    if (!isValidPhone(order.phone)) errors.phone = " Not good Phone";
    if (Object.keys(errors).length > 0) return errors;
    const newOrder = await createOrder(order)
    store.dispatch(clearCart());
    return redirect(`/order/${newOrder.id}`)


}

export default CreateOrder;