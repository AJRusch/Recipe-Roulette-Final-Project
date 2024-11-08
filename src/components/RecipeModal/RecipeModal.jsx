import "./RecipeModal.css";
import { useState, useEffect } from "react";
import * as api from "../../utils/api";

function RecipeModal({ isOpen, onClose, recipeId }) {
  const [recipeSummary, setRecipeSummary] = useState(null);

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        if (recipeId) {
          const summary = await api.getRecipeSummary(recipeId);
          console.log(summary);
          setRecipeSummary(summary);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeSummary();
    console.log(recipeId);
  }, [recipeId]);

  return (
    <>
      <div className={`recipeModal ${isOpen ? "recipeModal_opened" : ""}`}>
        <div className="recipeModal__content">
          <button
            type="button"
            className="recipeModal__close"
            onClick={onClose}
          ></button>
          <div className="recipeModal__content_header">
            <h3 className="recipeModal__title">{recipeSummary?.title}</h3>
          </div>
          <p
            className="recipeModal__summary"
            dangerouslySetInnerHTML={{ __html: recipeSummary?.summary }}
          ></p>
        </div>
      </div>
    </>
  );
}

export default RecipeModal;
