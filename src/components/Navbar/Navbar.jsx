import "./Navbar.css";
import { Link } from "react-router-dom";

function Navbar({ handleLoginUser, handleRegisterUser }) {
  return (
    <section className="navbar__section">
      <div className="navbar__menu">
        <p className="navbar__login" onClick={handleLoginUser}>
          Log in
        </p>
        <p className="navbar__register" onClick={handleRegisterUser}>
          Register
        </p>
        <span
          className="navbar__about-recipes"
          data-text="Testing the hover tip"
        >
          Want to save your own Recipes?
        </span>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <p className="navbar__about">About</p>
        </Link>
      </div>
    </section>
  );
}

export default Navbar;
