import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/useFormAndValidation";

function EditProfileModal({ onClose, isOpen, handleEditProfile }) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditProfile(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ name: "" });
  };

  /*const handleChange = (e) => {
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
  }; */

  /*useEffect(() => {
    if (isOpen) {
      setValue({ name: currentUser?.name });
    }
  }, [isOpen, currentUser]); */

  return (
    <ModalWithForm
      title="Change profile data"
      type="form"
      buttonText={"Save changes"}
      onClose={onClose}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label htmlFor="name-edit" className="modal__label">
        Name*
      </label>
      <input
        type="text"
        id="name-edit"
        name="name"
        placeholder="Name"
        value={values.name || ""}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <span
        className={`modal__input-error ${
          errors.name ? "modal__input-error_visible" : ""
        }`}
        id="name-error"
      >
        {errors.name}
      </span>
    </ModalWithForm>
  );
}

export default EditProfileModal;
