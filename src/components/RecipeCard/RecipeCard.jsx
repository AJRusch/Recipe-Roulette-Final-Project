import "./RecipeCard.css";
import favoriteActive from "../../assets/likeActive.svg";
import favoriteInactive from "../../assets/likeInactive.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext, useState } from "react";

function RecipeCard({ recipe, handleRecipeSummaryOpen, handleFavorite }) {
  const currentUser = useContext(CurrentUserContext);
  const [isFavorited, setIsFavorited] = useState(
    recipe.favorites?.some((id) => id === currentUser?._id) || false
  );

  const handleRecipeClick = () => {
    handleRecipeSummaryOpen(recipe);
  };

  const handleOnFavorite = (e) => {
    e.preventDefault();
    setIsFavorited(!isFavorited);
    handleFavorite({ _id: recipe.id, isFavorited: !isFavorited });
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
            src={isFavorited ? favoriteActive : favoriteInactive}
            alt={isFavorited ? "Unfavorited" : "Favorited"}
            onClick={handleOnFavorite}
            className="recipe-card__like-btn"
          />
        )}
      </div>
    </div>
  );
}

export default RecipeCard;
