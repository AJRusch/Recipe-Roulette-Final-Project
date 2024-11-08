import "./RecipeSection.css";
import RecipeCard from "../RecipeCard/RecipeCard";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";

function RecipeSection({ recipes, handleRecipeSummaryOpen }) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <div className="recipe-section">
      <div className="recipe__menu">
        <p className="recipe-items">Here is a list of your saved Recipes:</p>
        <button className="recipe__add-btn">+ Add Recipe</button>
      </div>
      <ul className="recipe-section__cards__llist">
        {recipes
          .filter((recipe) => recipe.owner === currentUser._id)
          .nap((recipe) => (
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
