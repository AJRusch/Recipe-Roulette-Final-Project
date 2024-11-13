import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";
import * as api from "../../utils/api";
import Preloader from "../Preloader/Preloader";

function SearchBar() {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
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
      <div
        className={`searchbar__preloader ${
          isLoading ? "searchbar__preloader_hidden" : ""
        } `}
      >
        <Preloader />
        <h3 className="searchbar__preloader-text">Searching for Recipes</h3>
      </div>
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
