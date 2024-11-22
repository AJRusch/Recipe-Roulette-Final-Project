import "./RecipeCard.css";
import favoriteActive from "../../assets/likeActive.svg";
import favoriteInactive from "../../assets/likeInactive.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

function RecipeCard({ recipe, handleRecipeSummaryOpen }) {
  const currentUser = useContext(CurrentUserContext);

  const handleRecipeClick = () => {
    handleRecipeSummaryOpen(recipe);
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
            src={favoriteActive}
            alt="Favorited"
            className="recipe-card__like-btn"
          />
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
