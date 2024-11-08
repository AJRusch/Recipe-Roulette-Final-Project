import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function RegisterModal({
  isOpen,
  onClose,
  setActiveModal,
  closeActiveModal,
  handleRegistration,
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((priorData) => ({
      ...priorData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegistration(data);
  };

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
    >
      <label htmlFor="email-register" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        id="email-register"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <label htmlFor="password-register" className="modal__label">
        Password*
      </label>
      <input
        type="password"
        id="password-register"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <label htmlFor="name-register" className="modal__label">
        Name*
      </label>
      <input
        type="text"
        className="modal__input"
        value={data.name}
        required
        onChange={handleChange}
        id="name-register"
        name="name"
        placeholder="Name"
      />
    </ModalWithForm>
  );
}

export default RegisterModal;
