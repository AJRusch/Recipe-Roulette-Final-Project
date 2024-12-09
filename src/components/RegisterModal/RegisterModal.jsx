import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../utils/useFormAndValidation";

function RegisterModal({
  isOpen,
  onClose,
  setActiveModal,
  closeActiveModal,
  handleRegistration,
}) {
  /*const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  }); */

  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration({ ...values, name: values.name }, resetCurrentForm);
  };

  const resetCurrentForm = () => {
    resetForm({ email: "", password: "", name: "" });
  };

  /*const handleChange = (e) => {
    const { name, value } = e.target;
    setData((priorData) => ({
      ...priorData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  }; */

  const handleLoginClick = (e) => {
    e.preventDefault();
    closeActiveModal("register");
    setActiveModal("login");
  };

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onClose}
      title="Sign up"
      type="form"
      buttonText={"Sign up"}
      redirectText={"or Log in"}
      redirectTextClick={handleLoginClick}
      onSubmit={handleSubmit}
      formValid={isValid}
    >
      <label htmlFor="email-register" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        id="email-register"
        name="email"
        placeholder="Email"
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
      <label htmlFor="password-register" className="modal__label">
        Password*
      </label>
      <input
        type="password"
        id="password-register"
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
      <label htmlFor="name-register" className="modal__label">
        Name*
      </label>
      <input
        type="text"
        className="modal__input"
        value={values.name || ""}
        required
        onChange={handleChange}
        id="name-register"
        name="name"
        placeholder="Name"
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

export default RegisterModal;
