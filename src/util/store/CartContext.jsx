import { createContext, useReducer } from "react";
import { useState } from "react";

const CartContext = createContext({
  items: [],
  totalAmount: 0,
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  if (action.type === "ADD_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const updatedItems = [...state.items];
    if (existingCartItemIndex > -1) {
      const existingCartItem = state.items[existingCartItemIndex];
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems.push({ ...action.item, quantity: 1 });
    }

    return { ...state, items: updatedItems };
  }
  if (action.type === "REMOVE_ITEM") {
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const ExistingCartItem = state.items[existingCartItemIndex];
    if (ExistingCartItem.quantity === 1) {
      const updatedItems = [...state.items];
      updatedItems.splice(existingCartItemIndex, 1);
      return { ...state, items: updatedItems };
    }
    const updatedItem = {
      ...ExistingCartItem,
      quantity: ExistingCartItem.quantity - 1,
    };
    const updatedItems = [...state.items];
    updatedItems[existingCartItemIndex] = updatedItem;
    return { ...state, items: updatedItems };
  }
  if (action.type === "CLEAR") {
    return {...state, items: [] };
  }
  return state;
}

export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  function addItem(item) {
    dispatchCartAction({ type: "ADD_ITEM", item: item });
  }
  function removeItem(id) {
    dispatchCartAction({ type: "REMOVE_ITEM", item: { id: id } });
  }
  function clearCart() {
    dispatchCartAction({ type: "CLEAR" });
  }

  const cartContext = {
    items: cart.items,
    totalAmount: cart.items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ),
    addItem: addItem,
    removeItem: removeItem,
    clearCart: clearCart,
  };

  console.log(cartContext);

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}

export default CartContext;
