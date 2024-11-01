import RecipeCard from "../RecipeCard/RecipeCard";
import "./Main.css";
import Navbar from "../Navbar/Navbar";
import horn from "../../assets/horn-of-plenty.png";
import SearchBar from "../SearchBar/SearchBar";

function Main({
  handleLoginUser,
  handleRegisterUser,
  handleRecipeSummaryOpen,
}) {
  return (
    <main className="search__section">
      <Navbar
        handleLoginUser={handleLoginUser}
        handleRegisterUser={handleRegisterUser}
      />
      <section className="search-bar">
        <SearchBar handleRecipeSummaryOpen={handleRecipeSummaryOpen} />
      </section>
    </main>
  );
}

export default Main;
