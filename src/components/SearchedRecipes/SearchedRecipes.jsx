import "./SearchedRecipes.css";
import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import * as api from "../../utils/api";
import RecipeCard from "../RecipeCard/RecipeCard";

function SearchedRecipes({ handleRecipeSummaryOpen, handleSaveRecipe }) {
  const pageNumber = useRef(1);
  const [recipes, setRecipes] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const location = useLocation();
  const { searchResults } = location.state || { searchResults: [] };

  const handleViewMore = async () => {
    const nextPage = pageNumber.current + 1;
    try {
      const nextSearchResults = await api.searchRecipes(searchInput, nextPage);
      setRecipes([...searchResults, ...nextSearchResults.results]);
      pageNumber.current = nextPage;
      return nextSearchResults;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!searchResults || !Array.isArray(searchResults)) {
    }
  }, []);

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
              />
            ))}
        </ul>
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
