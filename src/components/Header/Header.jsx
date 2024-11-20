import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/Recipe Logo.png";
import Navbar from "../Navbar/Navbar";

function Header({
  handleLoginUser,
  handleRegisterUser,
  handleLogout,
  handleEditProfileUser,
  isLoggedIn,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const clockTime = currentTime.toLocaleString([], {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <header className="header">
      <div className="header-general-info">
        <Link to="/">
          <img src={logo} alt="Recipe Logo" className="header__logo" />
        </Link>

        <p className="header__date-time">
          {currentDate}, {clockTime}
        </p>
      </div>
      <Navbar
        handleLoginUser={handleLoginUser}
        handleRegisterUser={handleRegisterUser}
        handleEditProfileUser={handleEditProfileUser}
        handleLogout={handleLogout}
        isLoggedIn={isLoggedIn}
      />
    </header>
  );
}

export default Header;