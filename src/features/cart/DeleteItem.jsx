import Button from "../../ui/Button.jsx";
import {useDispatch} from "react-redux";
import {deleteItem} from "./cartSlice.js";

const DeleteItem = ({pizzaId}) => {
    const dispatch = useDispatch();

    const deleteItems = () => {
        dispatch(deleteItem(pizzaId))
    }
    return (
        <div>
            <Button type='small' onClick={deleteItems}>Delete</Button>
        </div>
    );
};
export default DeleteItem