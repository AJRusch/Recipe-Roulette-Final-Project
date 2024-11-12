import RecipeCard from "../RecipeCard/RecipeCard";
import "./Main.css";
import Navbar from "../Navbar/Navbar";
import horn from "../../assets/horn-of-plenty.png";
import SearchBar from "../SearchBar/SearchBar";
import PopularRecipes from "../PopularRecipes/PopularRecipes";

function Main({ handleRecipeSummaryOpen, addFavorite }) {
  return (
    <main className="search__section">
      <section className="search-bar">
        <SearchBar handleRecipeSummaryOpen={handleRecipeSummaryOpen} />
        <PopularRecipes
          handleRecipeSummaryOpen={handleRecipeSummaryOpen}
          addFavorite={addFavorite}
        />
      </section>
    </main>
  );
}

export default Main;
