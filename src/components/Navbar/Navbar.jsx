import "./Navbar.css";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Navbar({
  handleLoginUser,
  handleRegisterUser,
  handleEditProfileUser,
  handleLogout,
  isLoggedIn,
}) {
  const currentUser = useContext(CurrentUserContext);
  return (
    <section className="nav">
      <div className="nav__menu">
        {isLoggedIn ? (
          <div className="nav__menu">
            <Link to="/profile" style={{ textDecoration: "none" }}>
              <p className="nav__user">Hello {currentUser.name}</p>
            </Link>
            <button
              onClick={handleLogout}
              type="button"
              className="nav__logout"
            >
              Log out
            </button>
            <button
              onClick={handleEditProfileUser}
              type="button"
              className="nav__edit-info"
            >
              Update your info
            </button>
          </div>
        ) : (
          <div className="nav__menu">
            <button
              type="button"
              className="nav__login"
              onClick={handleLoginUser}
            >
              Log in
            </button>
            <button
              type="button"
              className="nav__register"
              onClick={handleRegisterUser}
            >
              Register
            </button>
          </div>
        )}

        <Link to="/about" style={{ textDecoration: "none" }}>
          <p className="nav__about">About</p>
        </Link>
      </div>
    </section>
  );
}

export default Navbar;
