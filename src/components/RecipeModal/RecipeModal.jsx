import "./RecipeModal.css";
import { useState, useEffect } from "react";
import * as api from "../../utils/api";

function RecipeModal({ isOpen, onClose, recipedId }) {
  const [recipeSummary, setRecipeSummary] = useState(null);

  useEffect(() => {
    const fetchRecipeSummary = async () => {
      try {
        if (recipeId) {
          const summary = await api.getRecipeSummary(recipeId);
          setRecipeSummary(summary);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRecipeSummary();
  }, [recipeId]);

  return (
    <>
      <div className="modal modal__opened" onClick={isOpen}>
        <div className="recipeModal__overlay"></div>
        <div className="recipeModal__shell">
          <div className="recipeModal__content">
            <div className="recipeModal__content_header">
              <h3 className="recipeModal__title">{recipeSummary?.title}</h3>
              <span className="recipeModal__close" onClick={onClose}></span>
            </div>
            <p
              className="recipeModal__summary"
              dangerouslySetInnerHTML={{ __html: recipeSummary?.summary }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RecipeModal;
