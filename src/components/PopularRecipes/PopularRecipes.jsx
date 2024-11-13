import { useEffect, useState } from "react";
import { API_KEY } from "../../utils/constants";
import RecipeCard from "../RecipeCard/RecipeCard";
import * as api from "../../utils/api";
import "./PopularRecipes.css";

function PopularRecipes({ handleRecipeSummaryOpen, addFavorite }) {
  const [recommended, setRecommended] = useState([]);

  const getPopularRecipes = async (e) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6`
    );
    const data = await api.json();
    setRecommended(data.recipes);
  };

  useEffect(() => {
    getPopularRecipes();
  }, []);

  /*useEffect(() => {
    // const setPopularRecipes = async (e) => {
    //   try {
    //     const { results } = await api.getPopularRecipes(recommended);
    //     console.log("RESULTS", recommended);
    //     setRecommended(results);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

    // setPopularRecipes();
    console.log(api.getPopularRecipes());
  }, [api.getPopularRecipes]); */

  return (
    <section className="popularRecipes">
      <h3 className="popularRecipes__subheader">
        Check out these popular Recipes...
      </h3>
      <div className="popularRecipes-results__wrapper">
        <ul className="popularRecipes__cards__list">
          {recommended?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              handleRecipeSummaryOpen={handleRecipeSummaryOpen}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PopularRecipes;
