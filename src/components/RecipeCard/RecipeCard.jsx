import "./RecipeCard.css";
import saveActive from "../../assets/saveActive.svg";
import saveInactive from "../../assets/saveInactive.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

function RecipeCard({
  recipe,
  handleRecipeSummaryOpen,
  handleSaveRecipe,
  savedRecipes,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isSaved =
    savedRecipes?.some((recipe2) => recipe2.image === recipe.image) || false;

  const handleRecipeClick = () => {
    handleRecipeSummaryOpen(recipe);
  };

  const handleSaveClick = (e) => {
    e.preventDefault(e);
    //setIsSaved(!isSaved);
    handleSaveRecipe({ ...recipe, isSaved: !isSaved });
  };

  return (
    <div className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-card__image"
        onClick={handleRecipeClick}
      />
      <div className="recipe-card__title-container">
        <h3 className="recipe-card__title">{recipe.title}</h3>
        {currentUser && (
          <img
            src={isSaved ? saveActive : saveInactive}
            alt={isSaved ? "Saved" : "Not saved"}
            className="recipe-card__like-btn"
            onClick={handleSaveClick}
          />
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
