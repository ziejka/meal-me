import axios from "axios";
import type { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import type { Meal } from "../domain/meal";

type PropsType = {
  data: {
    meals: Meal[];
  };
};

const Home: NextPage<PropsType> = ({ data }) => {
  const meal = data.meals[0];
  const ingredientsMap = [];
  let ingredientKey = "strIngredient",
    measureKey = "strMeasure",
    n = 1;

  while (meal[ingredientKey + n] !== "") {
    ingredientsMap.push([meal[measureKey + n], meal[ingredientKey + n]]);
    n++;
  }

  return (
    <article className="px-10 py-5 w-2/3 mx-auto rounded-lg my-4 border shadow-xl">
      <p className="text-4xl font-bold">{meal.strMeal}</p>
      <p className="text-xl italic mb-4">{meal.strCategory}</p>
      <section className="flex flex-row-reverse justify-between">
        <Image
          className="rounded-lg"
          src={meal.strMealThumb}
          alt="MealThumb"
          width="256"
          height="256"
          layout="fixed"
        />
        <section className="w-1/2">
          <p className="text-xl font-bold mb-2 mt-6 inline-block">
            Ingredients
          </p>
          {ingredientsMap.map((x) => (
            <p key={x[1]}>
              {x[0]} {x[1]}
            </p>
          ))}
        </section>
      </section>
      <p className="text-xl font-bold mb-2 mt-7">Instructions</p>
      <p className="whitespace-pre-wrap">{meal.strInstructions}</p>
      <p className="text-s opacity-50 italic mt-3">
        <a className="hover:underline" href={meal.strSource}>
          Original source: {meal.strSource}
        </a>
      </p>
    </article>
  );
};

// This should be fetched on the client side this is just a test
export const getServerSideProps: GetServerSideProps<PropsType> = async () => {
  let data;
  try {
    const response = await axios.get(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    data = response.data;
    console.log(data);
  } catch (error) {
    console.log(error);
  }

  return { props: { data } };
};

export default Home;
