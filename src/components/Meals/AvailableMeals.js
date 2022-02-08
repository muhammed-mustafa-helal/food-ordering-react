import { useEffect, useState } from 'react';

import Card from '../UI/Card';
import MealItem from './MealItem/MealItem';
import classes from './AvailableMeals.module.css';

const API_URL = 'https://food-ordering-app-e07eb-default-rtdb.europe-west1.firebasedatabase.app/meals.json';

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);
      const response = await fetch(API_URL);
      const responseData = await response.json();

      const LoadedMeals = [];
      for (const key in responseData) {
        LoadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price
        })
      }
      setMeals(LoadedMeals);
      setIsLoading(false)
    };
    fetchMeals();
  }, []);


  if (isLoading) {
    return <section className={classes.MealsLoading}>
      <p>Loading ...</p>
    </section>
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
