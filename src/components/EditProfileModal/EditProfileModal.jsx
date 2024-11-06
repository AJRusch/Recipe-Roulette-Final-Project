import { useState, useCallback } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function EditProfileModal({ onClose, isOpen }) {
  const [value, setValue] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prevValue) => ({
      ...prevValue,
      [name]: value,
    }));
  };

  const resetForm = useCallback(
    (newValue = {}) => {
      setValue(newValue);
    },
    [setValue]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    //handleEditProfile(value, resetForm); need to implement logic in App.jsx
  };
  return (
    <ModalWithForm
      title="Change profile data"
      type="form"
      buttonText={"Save changes"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name-edit" className="modal__label">
        Name*
      </label>
      <input
        type="text"
        id="name-edit"
        name="name"
        placeholder="Name"
        value={value.name || ""}
        onChange={handleChange}
        required
        className="modal__input"
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;
