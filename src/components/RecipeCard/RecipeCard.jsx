import "./RecipeCard.css";
import favoriteActive from "../../assets/likeActive.svg";
import favoriteInactive from "../../assets/likeInactive.svg";

function RecipeCard({ recipe, handleRecipeSummaryOpen }) {
  return (
    <div className="recipe-card">
      <img
        src={recipe.image}
        alt={recipe.name}
        className="recipe-card__image"
        onClick={handleRecipeSummaryOpen}
      />
      <div className="recipe-card__title-container">
        <h3 className="recipe-card__title">{recipe.title}</h3>
      </div>
    </div>
  );
}

export default RecipeCard;
