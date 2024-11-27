import "./Main.css";
import SearchBar from "../SearchBar/SearchBar";
import PopularRecipes from "../PopularRecipes/PopularRecipes";

function Main({
  handleRecipeSummaryOpen,
  handleSaveRecipe,
  recommended,
  setRecommended,
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
        />
      </section>
    </main>
  );
}

export default Main;
