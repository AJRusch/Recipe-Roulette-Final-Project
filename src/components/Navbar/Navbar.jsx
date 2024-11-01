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
        <p className="navbar__about-recipes">Want to save your own Recipes?</p>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <p className="navbar__about">About</p>
        </Link>
      </div>
    </section>
  );
}

export default Navbar;
