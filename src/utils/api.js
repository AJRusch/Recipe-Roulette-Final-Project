import { processServerResponse } from "./promise";
import { getToken } from "./token";
const baseUrl = new URL("http://localhost:3002");

const searchRecipes = async (searchTerm, page) => {
  try {
    const baseUrl = new URL("http://localhost:3002/api/recipes/search");
    baseUrl.searchParams.append("searchTerm", searchTerm);
    baseUrl.searchParams.append("page", page.toString());

    const response = await fetch(baseUrl.toString());

    if (!response.ok) {
      throw new Error(`HTTP error. Status: ${response.status}`);
    }

    const text = await response.text();
    try {
      const data = JSON.parse(text);
      console.log("Data:", data);
      return data;
    } catch (error) {
      console.error("Parsing error, raw response:", text);
      throw new Error("Invalid JSON response");
    }
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export { searchRecipes };

const getRecipeSummary = async (recipeId) => {
  const url = new URL(`http://localhost:3002/api/recipes/${recipeId}/summary`);
  const response = await fetch(url);
  console.log(response);

  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }
  console.log(response);
  return response.json();
};

export { getRecipeSummary };

function getRecipeItems() {
  return fetch(`${baseUrl}/recipes`).then(processServerResponse);
}

export { getRecipeItems };

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

export { createRecipecard };

function deleteRecipeCard(recipeId, token) {
  return fetch(`${baseUrl}/recipes/${recipeId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

export { deleteRecipeCard };

function addFavorite(recipeId) {
  const token = getToken();
  return fetch(`${baseUrl}/recipes/${recipeId}/favorites`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

export { addFavorite };

function removeFavorite(recipeId) {
  const token = getToken();
  return fetch(`${baseUrl}/recipes/${recipeId}/favorites`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

export { removeFavorite };
