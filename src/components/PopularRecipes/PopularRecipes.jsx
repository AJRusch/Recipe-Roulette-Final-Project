import { useEffect, useState } from "react";
import { API_KEY } from "../../utils/constants";
import RecipeCard from "../RecipeCard/RecipeCard";
import * as api from "../../utils/api";
import "./PopularRecipes.css";

function PopularRecipes({ handleRecipeSummaryOpen, handleFavorite }) {
  const [recommended, setRecommended] = useState([]);

  useEffect(() => {
    const setPopularRecipes = async () => {
      try {
        const results = await api.getPopularRecipes();
        if (results) {
          setRecommended(results.recipes);
        }
      } catch (error) {
        console.error(error);
      }
    };

    setPopularRecipes();
  }, []);

  return (
    <section className="popularRecipes">
      <h3 className="popularRecipes__subheader">
        Check out these popular Recipes...
      </h3>
      <div className="popularRecipes-results__wrapper">
        <ul className="popularRecipes__cards__list">
          {recommended?.map((recipe) => (
            <RecipeCard
              handleFavorite={handleFavorite}
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
