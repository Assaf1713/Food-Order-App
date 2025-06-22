import {currencyFormatter} from "../util/formatting.js";
import Button from "./UI/Button.jsx";
import {useContext} from "react";
import CartContext from "../util/store/CartContext.jsx";

export default function MealItem({ meal }) {
  const cartCtx = useContext(CartContext);

  function addToCartHandler() {
    cartCtx.addItem(meal)
    console.log(`Adding ${meal.name} to cart`);
    };

    
    
  


  return (
    <li className="meal-item">
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div>
          <h2>{meal.name}</h2>
          <p className="meal-item-price"> {currencyFormatter.format(meal.price)}    </p>
          <p className="meal-item-description">{meal.description}</p>
        </div>
        <p className="meal-item-actions">
          <Button onClick={addToCartHandler}>
            הוסף לסל
          </Button>
        </p>
      </article>
    </li>
  );
}

