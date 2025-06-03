import { useContext } from "react";
import Modal from "./UI/Modal";
import { currencyFormatter } from "../util/formatting";
import UserProgressContext from "../util/store/userProgress";
import CartContext from "../util/store/CartContext";
import Button from "./UI/Button";
import CartItem from "./CartItem";

export default function Cart() {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);
  if (userProgressCtx.progress !== "cart") {
    return null; // Don't render anything if not in cart progress
  }
  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function closeCartModal() {
    userProgressCtx.hideCart();
  }

  return (
    <Modal className="cart" open={userProgressCtx.progress === "cart"}>
      <h2>Your Cart</h2>
      {cartCtx.items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cartCtx.items.map((item) => (
            <CartItem
              key={item.id}
              name={item.name}
              quantity={item.quantity}
              price={item.price}
              onIncrease={() => cartCtx.addItem(item)}
              onDecrease={() => cartCtx.removeItem(item.id)}
            />
          ))}
        </ul>
      )}
      <p className="cart-total">
        Total Amount: {currencyFormatter.format(cartTotal)}{" "}
      </p>
      <p className="modal-actions">
        <Button textOnly onClick={closeCartModal}>
          Close
        </Button>
        {cartCtx.items.length === 0 ? null : (
          <Button textOnly> Checkout </Button>
        )}
      </p>
    </Modal>
  );
}
