import "./Main.css";
import SearchBar from "../SearchBar/SearchBar";
import PopularRecipes from "../PopularRecipes/PopularRecipes";

function Main({
  handleRecipeSummaryOpen,
  handleSaveRecipe,
  recommended,
  setRecommended,
  savedRecipes,
}) {
  return (
    <main className="search__section">
      <section className="search-bar">
        <SearchBar handleRecipeSummaryOpen={handleRecipeSummaryOpen} />
        <PopularRecipes
          handleRecipeSummaryOpen={handleRecipeSummaryOpen}
          handleSaveRecipe={handleSaveRecipe}
          recommended={recommended}
          setRecommended={setRecommended}
          savedRecipes={savedRecipes}
        />
      </section>
    </main>
  );
}

export default Main;
