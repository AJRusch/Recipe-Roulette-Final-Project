import "./RecipeSection.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function RecipeSection({
  recipes,
  handleRecipeSummaryOpen,
  handleAddRecipe,
  addFavorite,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="recipe-section">
      <div className="recipe__menu">
        <p className="recipe__header">Here is a list of your saved Recipes:</p>
        <button
          type="button"
          onClick={handleAddRecipe}
          className="recipe__add-btn"
        >
          + Add Recipe
        </button>
      </div>
      <ul className="recipe-section__cards__list">
        {recipes
          .filter((recipe) => recipe.owner === currentUser._id)
          .map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              handleRecipeSummaryOpen={handleRecipeSummaryOpen}
            />
          ))}
      </ul>
    </div>
  );
}

export default RecipeSection;
