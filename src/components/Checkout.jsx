import CartContext from "../util/store/CartContext";
import UserProgressContext from "../util/store/userProgress";
import { useContext } from "react";
import Modal from "./UI/Modal";
import Button from "./UI/Button";
import { currencyFormatter } from "../util/formatting";
import Input from "./UI/Input";
import useHttp from "../Hooks/useHttp";

const requestConfig = {
  method: "POST",
  headers: { "Content-Type": "application/json" },
};

export default function Checkout({}) {
  const cartCtx = useContext(CartContext);
  const userProgressCtx = useContext(UserProgressContext);

  const {
    isLoading: isSending,
    error,
    data,
    sendRequest,
    clearData
  } = useHttp("http://localhost:3000/orders", requestConfig);

  const cartTotal = cartCtx.items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function handleClose() {
    userProgressCtx.hideCheckout();
  }

  function handleFinish(){
    userProgressCtx.hideCheckout();
    userProgressCtx.hideCart();
    cartCtx.clearCart();
    clearData();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const CustomerData = Object.fromEntries(fd.entries());
    sendRequest(
      JSON.stringify({
        order: { customer: CustomerData, items: cartCtx.items },
      })
    );
  }

  let actions = (
    <>
      <Button type="button" textOnly onClick={handleClose}>
        Cancel
      </Button>
      <Button>Submit Order</Button>
    </>
  );

  //show success message via moda
  if (data && !error){
    return(
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}>
        <h2>Order Successful!</h2>
        <p>Thank you for your order!</p>
        <p className="modal-actions">
        <Button onClick={handleFinish}>OK!</Button>
        </p>
      </Modal>
    )
  }

  if (isSending) {
    actions = <p className="loading">Sending order...</p>;
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      className="checkout"
      onClose={userProgressCtx === "cart" ? handleClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2> Checkout</h2>
        <p> Total Amount : {currencyFormatter.format(cartTotal)}</p>
        <Input label="Your Name" type="text" id="name" />
        <Input label="Your Address" type="text" id="street" />
        <Input label="Your Email" type="email" id="email" />
        <div className="control-row">
          <Input label="Postal Code" type="text" id="postal-code" />
          <Input label="City" type="text" id="city" />
        </div>
        {error && <Error title='failed to submit the order' message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
