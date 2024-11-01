import React, { useRef, useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import * as api from "../../utils/api";
import RecipeCard from "../RecipeCard/RecipeCard";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [recipes, setRecipes] = useState([]);
  const pageNumber = useRef(1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:3002/api/recipes/search?searchTerm=${searchInput}`
      );
      if (!response.ok) {
        throw new Error(`HTTP error. status: ${response.status}`);
      }
      const data = await response.json();
      setRecipes(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { results } = await api.searchRecipes(searchInput, 1);
      setRecipes(results);
      pageNumber.current = 1;
    } catch (error) {
      console.error(error);
    }
  }; */

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextRecipePage = await api.searchRecipes(searchInput, nextPage);
      setRecipes([...recipes, ...nextRecipePage.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="searchbar">
      <div className="searchbar__wrapper">
        <form onSubmit={handleSubmit} className="searchbar__form">
          <input
            type="text"
            placeholder="Type to search a recipe..."
            className="searchbar__input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </div>
      <div className="searchbar-results__wrapper">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            handleRecipeSummaryOpen={handleRecipeSummaryOpen}
          />
        ))}
        <button className="searchbar-view-more" onClick={handleViewMore}>
          View More
        </button>
      </div>
    </section>
  );
}

export default SearchBar;
