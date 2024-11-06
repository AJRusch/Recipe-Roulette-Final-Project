import "./SearchedRecipes.css";
import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as api from "../../utils/api";
import RecipeCard from "../RecipeCard/RecipeCard";

function SearchedRecipes({ handleRecipeSummaryOpen }) {
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

  const getSearched = async (e) => {
    try {
      const { results } = await api.searchRecipes(searchInput, 1);
      console.log(results);
      setRecipes(results);
      pageNumber.current = 1;
    } catch (error) {
      console.error(error);
    }
  };

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

  useEffect(() => {
    if (!searchResults || !Array.isArray(searchResults)) {
      getSearched();
    }
  }, []);

  return (
    <section className="searchedRecipes">
      <div className="searchedRecipes__info-box">
        <h3 className="searchedRecipes__header">Here is what we found:</h3>
      </div>
      <div className="searchbar-results__wrapper">
        {searchResults &&
          searchResults.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              handleRecipeSummaryOpen={handleRecipeSummaryOpen}
            />
          ))}
      </div>
      <button className="searchRecipes-view-more" onClick={handleViewMore}>
        View More
      </button>
      <p className="searchedRecipes__info">
        When you are finished here, click on the logo to go back to the home
        page and make another search!
      </p>
    </section>
  );
}

export default SearchedRecipes;
