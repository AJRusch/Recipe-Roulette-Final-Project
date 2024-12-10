import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/useFormAndValidation";

function LoginModal({
  isOpen,
  onClose,
  setActiveModal,
  closeActiveModal,
  handleLogin,
}) {
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(values, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "" });
  };

  const handleRegisterClick = (e) => {
    e.preventDefault();
    closeActiveModal("login");
    setActiveModal("register");
  };

  return (
    <ModalWithForm
      title="Log in"
      type="form"
      buttonText={"Log in"}
      redirectText={"or Sign up"}
      onSubmit={handleSubmit}
      redirectTextClick={handleRegisterClick}
      isOpen={isOpen}
      onClose={onClose}
      formValid={isValid}
    >
      <label htmlFor="email-login" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        id="email-login"
        name="email"
        placeholder="Email"
        minLength="2"
        maxLength="65"
        value={values.email || ""}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <span
        className={`modal__input-error ${
          errors.email ? "modal__input-error_visible" : ""
        }`}
        id="email-error"
      >
        {errors.email}
      </span>
      <label htmlFor="password-login" className="modal__label">
        Password*
      </label>
      <input
        type="password"
        id="password-login"
        name="password"
        placeholder="Password"
        value={values.password || ""}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <span
        className={`modal__input-error ${
          errors.password ? "modal__input-error_visible" : ""
        }`}
        id="password-error"
      >
        {errors.password}
      </span>
    </ModalWithForm>
  );
}

export default LoginModal;
