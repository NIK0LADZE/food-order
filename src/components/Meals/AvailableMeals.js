import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(
          "https://react-http-2adf2-default-rtdb.firebaseio.com/meals.json"
        );

        if (!response.ok) {
          throw new Error("Request failed!");
        }

        const data = await response.json();
        const loadedData = [];

        for (let key in data) {
          loadedData.push({
            id: key,
            name: data[key].name,
            description: data[key].description,
            price: data[key].price,
          });
        }

        setMeals(loadedData);
      } catch (e) {
        setError(e.message);
      }
      setIsLoading(false);
    })();
  }, []);

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  const errorMessage = <p className={classes.errorText}>{error}</p>;
  const loadingText = <p className={classes.loadingText}>Loading...</p>;
  const mealsSection = (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );

  return isLoading ? loadingText : error ? errorMessage : mealsSection;
};

export default AvailableMeals;
