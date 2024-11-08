/*   PLEASE READ THE README FILE */

import { Route, Routes, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import RecipeModal from "../RecipeModal/RecipeModal";
import SearchedRecipes from "../SearchedRecipes/SearchedRecipes";
import Profile from "../Profile/Profile";
import About from "../About/About";
import { getToken, setToken, removeToken } from "../../utils/token";
import {
  registerUser,
  signInUser,
  updateUser,
  isValidToken,
} from "../../utils/auth";
import {
  createRecipecard,
  deleteRecipeCard,
  addFavorite,
  removeFavorite,
  getRecipeItems,
} from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const navigate = useNavigate();

  const handleRegisterUser = () => {
    setActiveModal("register");
  };

  const handleLoginUser = () => {
    setActiveModal("login");
  };

  const handleEditProfileuser = () => {
    setActiveModal("edit-profile");
  };

  const handleRecipeSummaryOpen = (recipe) => {
    setActiveModal("summary");
    setSelectedRecipe(recipe);
    console.log(recipe);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleRegistration = ({ email, password, name }) => {
    registerUser({
      email,
      password,
      name,
    })
      .then((res) => {
        setIsloggedIn(true);
        setCurrentUser(res.data);
        console.log(res);
        navigate("/profile");
        closeActiveModal();
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const handleLogin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    signInUser({ email, password })
      .then((res) => {
        setToken(res.token);
        return isValidToken(res.token);
      })
      .then((user) => {
        setCurrentUser(user);
        setIsloggedIn(true);
        closeActiveModal();
        navigate(protectedDestination || "/");
      })
      .catch((err) => {
        console.error("Wrong Login information", err);
      });
  };

  const handleEditProfile = ({ name }) => {
    updateUser({ name })
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        closeActiveModal();
      })
      .catch((res) => {
        console.error(res);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsloggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  const handleSubmit = (request) => {
    request().then(closeActiveModal).catch(console.error);
  };

  const handleAddRecipeSubmit = (newRecipe, resetCurrentForm) => {
    const token = getToken();

    const startRequest = () => {
      return createRecipecard(newRecipe, token).then((res) => {
        setRecipes([res.data, ...recipes]);
      });
    };
    handleSubmit(startRequest);
  };

  const handleDeleteRecipe = () => {
    const token = getToken();

    const startRequest = () => {
      return deleteRecipeCard(selectedRecipe._id, token).then(() =>
        setRecipes((prevRecipe) =>
          prevRecipe.filter((recipe) => recipe._id !== selectedRecipe._id)
        )
      );
    };
    handleSubmit(startRequest);
  };

  const handleFavorite = ({ _id, isFavorited }) => {
    const id = _id;
    const token = getToken();

    const updateRecipeCards = (newCard) => (cards) => {
      return updateRecipeCards.map((recipe) =>
        recipe._id === id ? newCard : recipe
      );
    };

    if (!isFavorited) {
      addFavorite(id, token)
        .then((newCard) => {
          setRecipes(updateRecipeCards(newCard.recipe));
        })
        .catch(console.error);
    } else if (isFavorited) {
      removeFavorite(id, token)
        .then((newCard) => {
          setRecipes(updateRecipeCards(newCard.recipe));
        })
        .catch(console.error);
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    isValidToken(token)
      .then((res) => {
        console.log(res);
        setCurrentUser(res);
        setIsloggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="recipe-app">
      <div className="recipe-app-content">
        <Header
          handleLoginUser={handleLoginUser}
          handleRegisterUser={handleRegisterUser}
        />
        <Routes>
          <Route
            path="/"
            element={<Main handleRecipeSummaryOpen={handleRecipeSummaryOpen} />}
          />
          <Route
            path="/profile"
            element={
              <Profile
                recipes={recipes}
                handleRecipeSummaryOpen={handleRecipeSummaryOpen}
              />
            }
          />
          <Route
            path="/searched"
            element={
              <SearchedRecipes
                handleRecipeSummaryOpen={handleRecipeSummaryOpen}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>

        <Footer />
      </div>

      <RegisterModal
        isOpen={activeModal === "register"}
        onClose={closeActiveModal}
        setActiveModal={setActiveModal}
        closeActiveModal={closeActiveModal}
      />
      <LoginModal
        isOpen={activeModal === "login"}
        onClose={closeActiveModal}
        setActiveModal={setActiveModal}
        closeActiveModal={closeActiveModal}
        handleRegistration={handleRegistration}
        handleLogin={handleLogin}
      />
      <EditProfileModal
        onClose={closeActiveModal}
        isOpen={activeModal === "edit-profile"}
        setActiveModal={setActiveModal}
      />
      {selectedRecipe && (
        <RecipeModal
          isOpen={activeModal === "summary"}
          onClose={() => {
            setSelectedRecipe(null);
            closeActiveModal();
          }}
          recipeId={selectedRecipe?.id}
        />
      )}
    </div>
  );
}

export default App;
