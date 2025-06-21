import useHttp from "../Hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};

export default function Meals() {

  const { isLoading, error, data: loadedMeals } = useHttp(
    "http://localhost:3000/meals", requestConfig , []
  );

  if (isLoading) {
    return <p className="loading">Loading meals...</p>;
  }


  return (
    <ul id="meals">
      {" "}
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
}
