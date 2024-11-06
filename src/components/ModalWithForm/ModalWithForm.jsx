import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  onClose,
  onSubmit,
  redirectText,
  redirectTextClick,
}) {
  return (
    <div className={`modal ${isOpen ? "modal_opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={onClose}
        ></button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__btn-box">
            <button className="modal__submit" type="submit">
              {buttonText}
            </button>
            <button
              className="modal__btn-redirect"
              type="button"
              onClick={redirectTextClick}
            >
              {redirectText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
