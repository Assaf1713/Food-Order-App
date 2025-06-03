import Button from './UI/Button.jsx';
import logoImg from '../assets/logo.jpg';
import CartContext from '../util/store/CartContext.jsx';
import { useContext } from 'react';
import Cart from './Cart.jsx';
import UserProgressContext from '../util/store/userProgress.jsx';

export default function Header ({ openCart }) {
    const cartCtx = useContext(CartContext);
    const totalItems = cartCtx.items.reduce((total, item) => total + item.quantity, 0);
    const userProgressCtx = useContext(UserProgressContext);
   
    function openCartHandler() {
        userProgressCtx.showCart();
    }

    return ( 
        <header id="main-header">   
            <div id="title">
                <img src={logoImg} alt="A resturant" /> 
                <h1></h1>
            </div>
            <nav>
                <Button textOnly onClick={openCartHandler} >Cart ({totalItems})</Button>
                
            </nav>
        </header>
    )



}