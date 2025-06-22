import Button from "./UI/Button.jsx";
import logoImg from "../assets/alexander_logo.jpg";
import CartContext from "../util/store/CartContext.jsx";
import { useContext } from "react";
import Cart from "./Cart.jsx";
import UserProgressContext from "../util/store/userProgress.jsx";
import { useEffect } from "react";

export default function Header({ openCart }) {
  const cartCtx = useContext(CartContext);
  const totalItems = cartCtx.items.reduce(
    (total, item) => total + item.quantity,
    0
  );
  const userProgressCtx = useContext(UserProgressContext);

  function openCartHandler() {
    userProgressCtx.showCart();
  }

    useEffect(() => {
        // Log the current progress whenever it changes
        console.log("Current progress:", userProgressCtx.progress);
    }, [userProgressCtx.progress]);

  return (
    <header id="main-header">
      <div id="title">
        <img src={logoImg} alt="A resturant" />
        <h1></h1>
      </div>
      <nav>
        <Button textOnly onClick={openCartHandler}>
          סל הקניות ({totalItems})
        </Button>
      </nav>
    </header>
  );
}
