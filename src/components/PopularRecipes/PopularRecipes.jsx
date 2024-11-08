import { useEffect, useState, useRef } from "react";
import { API_KEY } from "../../utils/constants";
import RecipeCard from "../RecipeCard/RecipeCard";
import "./PopularRecipes.css";

function PopularRecipes({ handleRecipeSummaryOpen }) {
  const [recommended, setRecommended] = useState([]);
  const pageNumber = useRef(1);

  const api = `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6`;

  const getPopularRecipes = async (e) => {
    const api = await fetch(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6`
    );
    const data = await api.json();
    pageNumber.current = 1;
    setRecommended(data.recipes);
  };

  useEffect(() => {
    getPopularRecipes();
  }, []);

  return (
    <section className="popularRecipes">
      <h3 className="popularRecipes__subheader">
        Check out these popular Recipes...
      </h3>
      <div className="popularRecipes-results__wrapper">
        {recommended.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            handleRecipeSummaryOpen={handleRecipeSummaryOpen}
          />
        ))}
      </div>
    </section>
  );
}

export default PopularRecipes;
