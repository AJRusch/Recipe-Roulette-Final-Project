import { processServerResponse } from "./promise";
import { getToken } from "./token";
//const baseUrl = new URL("http://localhost:3002");

/*const searchRecipes = async (searchTerm, page) => {
  const baseUrl = new URL("http://localhost:3002/api/recipes/search");
  baseUrl.searchParams.append("searchTerm", searchTerm);
  baseUrl.searchParams.append("page", page.toString());

  const response = await fetch(baseUrl.toString());
  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }
  console.log(response);
  return response.json();
};

export { searchRecipes }; */

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

  if (!response.ok) {
    throw new Error(`HTTP error. Status: ${response.status}`);
  }
  console.log(response);
  return response.json();
};

export { getRecipeSummary };

function addCardLike(id) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

export { addCardLike };

function removeCardLike(id) {
  const token = getToken();
  return fetch(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  }).then(processServerResponse);
}

export { removeCardLike };
