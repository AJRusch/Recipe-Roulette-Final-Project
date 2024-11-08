import "./RecipeCard.css";
import favoriteActive from "../../assets/likeActive.svg";
import favoriteInactive from "../../assets/likeInactive.svg";

function RecipeCard({ recipe, handleRecipeSummaryOpen }) {
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
        <img
          src={favoriteActive}
          alt="Liked"
          className="recipe-card__like-btn"
        />
      </div>
    </div>
  );
}

export default RecipeCard;
