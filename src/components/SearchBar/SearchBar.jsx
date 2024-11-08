import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import * as api from "../../utils/api";
import RecipeCard from "../RecipeCard/RecipeCard";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { results } = await api.searchRecipes(searchInput, 1);
      console.log(results);
      navigate("/searched", { state: { searchResults: results } });
    } catch (error) {
      console.error(error);
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
          <FaSearch className="searchbar__icon" />
        </form>
      </div>
    </section>
  );
}

export default SearchBar;
