import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({
  isOpen,
  onClose,
  setActiveModal,
  closeActiveModal,
  handleLogin,
}) {
  const [data, setData] = useState({
    email: "",
    password: "",
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
    handleLogin(data);
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
    >
      <label htmlFor="email-login" className="modal__label">
        Email*
      </label>
      <input
        type="email"
        id="email-login"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        required
        className="modal__input"
      />
      <label htmlFor="password-login" className="modal__label">
        Password*
      </label>
      <input
        type="password"
        id="password-login"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        required
        className="modal__input"
      />
    </ModalWithForm>
  );
}

export default LoginModal;
