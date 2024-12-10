import { processServerResponse } from "./promise";
import { API_KEY } from "./constants";

/*const baseUrl =
  process.env.REACT_APP_API_URL === "production"
    ? "https://api.reciperoulette.twilightparadox.com"
    : "http://localhost:3002"; */

const baseUrl = import.meta.env.VITE_APP_API_URL;

const searchRecipes = async (searchTerm, page) => {
  try {
    const url = new URL(`${baseUrl}/api/recipes/search`);
    url.searchParams.append("searchTerm", searchTerm);
    url.searchParams.append("page", page.toString());

    const response = await fetch(url.toString());
    const data = await processServerResponse(response);
    console.log("Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw error;
  }
};

const getPopularRecipes = async () => {
  try {
    const url = new URL(
      `https://api.spoonacular.com/recipes/random?apiKey=${API_KEY}&number=6`
    );
    const response = await fetch(url);
    const data = await processServerResponse(response);
    return data;
  } catch (error) {
    console.error("Error fetching popular recipes:", error);
    throw error;
  }
};

const getRecipeSummary = async (recipeId) => {
  const url = new URL(`${baseUrl}/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);
  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }
  console.log(response);
  return response.json();
};

function getRecipeItems(token) {
  return fetch(`${baseUrl}/recipes`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

function createRecipecard({ title, imageUrl, summary }, token) {
  return fetch(`${baseUrl}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, imageUrl, summary }),
  }).then(processServerResponse);
}

function deleteRecipeCard(recipeId, token) {
  return fetch(`${baseUrl}/recipes/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

function saveRecipe({ title, summary, image }, token) {
  return fetch(`${baseUrl}/recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      title,
      summary,
      image,
    }),
  }).then(processServerResponse);
}

export {
  saveRecipe,
  createRecipecard,
  deleteRecipeCard,
  searchRecipes,
  getPopularRecipes,
  getRecipeSummary,
  getRecipeItems,
};
