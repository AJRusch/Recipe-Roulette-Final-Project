import "./RecipeSection.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function RecipeSection({
  handleSaveRecipe,
  handleRecipeSummaryOpen,
  handleFavorite,
  savedRecipes,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="recipe-section">
      <div className="recipe__menu">
        <p className="recipe__header">Here is a list of your saved Recipes:</p>
        <p className="recipe__header">
          Click on the save button again if you wish to delete a recipe
        </p>
      </div>
      <ul className="recipe-section__cards__list">
        {savedRecipes
          .filter((recipe) => recipe.owner === currentUser._id)
          .map((recipe) => (
            <RecipeCard
              key={recipe._id}
              recipe={recipe}
              handleRecipeSummaryOpen={handleRecipeSummaryOpen}
              handleFavorite={handleFavorite}
              handleSaveRecipe={handleSaveRecipe}
            />
          ))}
      </ul>
    </div>
  );
}

export default RecipeSection;
