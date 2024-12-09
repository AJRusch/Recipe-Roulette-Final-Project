import { useEffect } from "react";
import RecipeCard from "../RecipeCard/RecipeCard";
import * as api from "../../utils/api";
import "./PopularRecipes.css";

function PopularRecipes({
  handleRecipeSummaryOpen,
  handleSaveRecipe,
  recommended,
  setRecommended,
  savedRecipes,
}) {
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
      <div className="popularRecipes__results-wrapper">
        <ul className="popularRecipes__cards__list">
          {recommended?.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              handleRecipeSummaryOpen={handleRecipeSummaryOpen}
              handleSaveRecipe={handleSaveRecipe}
              savedRecipes={savedRecipes}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}

export default PopularRecipes;
