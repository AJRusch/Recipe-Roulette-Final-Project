import "./SearchedRecipes.css";
import { useLocation } from "react-router-dom";
import RecipeCard from "../RecipeCard/RecipeCard";

function SearchedRecipes({
  handleRecipeSummaryOpen,
  handleSaveRecipe,
  savedRecipes,
}) {
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

  return (
    <section className="searchedRecipes">
      <div className="searchedRecipes__info-box">
        <h3 className="searchedRecipes__header">Here is what we found:</h3>
      </div>
      <div className="searchedRecipes-results__wrapper">
        <ul className="searchedRecipes__cards__list">
          {searchResults &&
            searchResults.map((recipe) => (
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
      <p className="searchedRecipes__info">
        When you are finished here, click on the logo to go back to the home
        page and make another search!
      </p>
    </section>
  );
}

export default SearchedRecipes;
