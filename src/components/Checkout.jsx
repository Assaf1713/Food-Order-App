import CartContext from "../util/store/CartContext";
import UserProgressContext from "../util/store/userProgress";
import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";


export default function Checkout({ onClose, onSubmit, isSubmitting }) {
    const cartCtx = useContext(CartContext);
    const userProgressCtx = useContext(UserProgressContext);

}
