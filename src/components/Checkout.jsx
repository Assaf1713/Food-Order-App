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
        ביטול
      </Button>
      <Button>שלח הזמנה</Button>
    </>
  );

  //show success message via moda
  if (data && !error){
    return(
      <Modal
        open={userProgressCtx.progress === "checkout"}
        onClose={handleClose}>
        <h2>ההזמנה התקבלה בהצלחה !</h2>
        <p>תודה על ההזמנה</p>
        <p className="modal-actions">
        <Button onClick={handleFinish}>סגור</Button>
        </p>
      </Modal>
    )
  }

  if (isSending) {
    actions = <p className="loading">שולח הזמנה לחנות...</p>;
  }

  return (
    <Modal
      open={userProgressCtx.progress === "checkout"}
      className="checkout"
      onClose={userProgressCtx === "cart" ? handleClose : null}
    >
      <form onSubmit={handleSubmit}>
        <h2> עמוד התשלום</h2>
        <p> סה"כ להזמנה : {currencyFormatter.format(cartTotal)}</p>
        <Input label="השם שלך" type="text" id="name" />
        <Input label="כתובת" type="text" id="street" />
        <Input label=" מייל" type="email" id="email" />
        <div className="control-row">
          <Input label=" מיקוד" type="text" id="postal-code" />
          <Input label="עיר" type="text" id="city" />
        </div>
        {error && <Error title='failed to submit the order' message={error} />}

        <p className="modal-actions">{actions}</p>
      </form>
    </Modal>
  );
}
