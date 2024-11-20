import "./Main.css";
import SearchBar from "../SearchBar/SearchBar";
import PopularRecipes from "../PopularRecipes/PopularRecipes";

function Main({ handleRecipeSummaryOpen, handleFavorite }) {
  return (
    <main className="search__section">
      <section className="search-bar">
        <SearchBar handleRecipeSummaryOpen={handleRecipeSummaryOpen} />
        <PopularRecipes
          handleRecipeSummaryOpen={handleRecipeSummaryOpen}
          handleFavorite={handleFavorite}
        />
      </section>
    </main>
  );
}

export default Main;
