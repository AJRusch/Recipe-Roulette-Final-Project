import "./RecipeCard.css";
import saveActive from "../../assets/saveActive.svg";
import saveInactive from "../../assets/saveInactive.svg";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { getRecipeSummary } from "../../utils/api";

function RecipeCard({
  recipe,
  handleRecipeSummaryOpen,
  handleSaveRecipe,
  savedRecipes,
}) {
  const currentUser = useContext(CurrentUserContext);

  const isSaved =
    savedRecipes?.some((recipe2) => {
      return recipe2.image === recipe.image;
    }) || false;

  const handleRecipeClick = () => {
    getRecipeSummary(recipe.id).then((data) => {
      const recipeWithSummary = { ...recipe, summary: data.summary };
      handleRecipeSummaryOpen(recipeWithSummary);
    });
  };

  const handleSaveClick = (e) => {
    e.preventDefault(e);
    if (isSaved) {
      handleSaveRecipe({
        ...recipe,
        isSaved: !isSaved,
      });
    } else {
      getRecipeSummary(recipe._id).then((data) => {
        handleSaveRecipe({
          ...recipe,
          isSaved: !isSaved,
          summary: data?.summary,
        });
      });
    }
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
