import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddRecipeModal = ({ onClose, isOpen, handleAddRecipe }) => {
  const [values, setValues] = useState({
    title: "",
    imageUrl: "",
    summary: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.prevenDefault();
    handleAddRecipe(values, resetForm());
  };

  function resetForm() {
    setValues({ title: "", imageUrl: " ", summary: "" });
  }

  return (
    <ModalWithForm
      buttonText="Add Recipe"
      title="New Recipe"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="title" className="modal__label">
        Recipe Title *{" "}
        <input
          type="text"
          minLength={5}
          maxLength={40}
          name="title"
          className="modal__input"
          id="title"
          placeholder="Recipe title"
          value={values.title}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Recipe Image *{" "}
        <input
          type="url"
          name="imageUrl"
          className="modal__input"
          id="imageUrl"
          placeholder="Recipe Image Url"
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="summary" className="modal__label">
        Recipe Summary *{" "}
        <input
          type="text"
          minLength={40}
          maxLength={600}
          name="summary"
          className="modal__input"
          id="summary"
          placeholder="Recipe Summary"
          value={values.summary}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
};

export default AddRecipeModal;
