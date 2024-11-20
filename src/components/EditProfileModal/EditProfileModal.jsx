import { useState, useCallback, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function EditProfileModal({ onClose, isOpen, handleEditProfile }) {
  const [value, setValue] = useState({});
  const currentUser = useContext(CurrentUserContext);

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
    handleEditProfile(value, resetForm);
  };

  useEffect(() => {
    if (isOpen) {
      setValue({ name: currentUser?.name });
    }
  }, [isOpen, currentUser]);

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
