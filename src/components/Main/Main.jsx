import RecipeCard from "../RecipeCard/RecipeCard";
import "./Main.css";
import Navbar from "../Navbar/Navbar";
import horn from "../../assets/horn-of-plenty.png";
import SearchBar from "../SearchBar/SearchBar";
import PopularRecipes from "../PopularRecipes/PopularRecipes";

function Main({ handleRecipeSummaryOpen }) {
  return (
    <main className="search__section">
      <section className="search-bar">
        <SearchBar handleRecipeSummaryOpen={handleRecipeSummaryOpen} />
        <PopularRecipes handleRecipeSummaryOpen={handleRecipeSummaryOpen} />
      </section>
    </main>
  );
}

export default Main;
