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
      <div className="navbar__menu">
        {isLoggedIn ? (
          <div className="navbar__menu">
            <p className="navbar__user">Hello {currentUser.name}</p>
            <button
              onClick={handleLogout}
              type="button"
              className="navbar__logout"
            >
              Log out
            </button>
            <button
              onClick={handleEditProfileUser}
              type="button"
              className="navbar__edit-info"
            >
              Update your info
            </button>
          </div>
        ) : (
          <div className="navbar__menu">
            <button
              type="button"
              className="navbar__login"
              onClick={handleLoginUser}
            >
              Log in
            </button>
            <button
              type="button"
              className="navbar__register"
              onClick={handleRegisterUser}
            >
              Register
            </button>
          </div>
        )}

        <Link to="/about" style={{ textDecoration: "none" }}>
          <p className="navbar__about">About</p>
        </Link>
      </div>
    </section>
  );
}

export default Navbar;
