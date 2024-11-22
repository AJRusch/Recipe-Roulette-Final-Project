/*   PLEASE READ THE README FILE */

import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import AddRecipeModal from "../AddRecipeModal/AddRecipeModal";
import RecipeModal from "../RecipeModal/RecipeModal";
import SearchedRecipes from "../SearchedRecipes/SearchedRecipes";
import Profile from "../Profile/Profile";
import About from "../About/About";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { UserRecipeContext } from "../../contexts/UserRecipeContext";
import { getToken, setToken } from "../../utils/token";
import {
  registerUser,
  signInUser,
  updateUser,
  isValidToken,
} from "../../utils/auth";
import {
  createRecipecard,
  deleteRecipeCard,
  saveRecipe,
} from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

  const UserRecipeContext = {
    recipes,
    setRecipes,
  };

  const handleRegisterUser = () => {
    setActiveModal("register");
  };

  const handleLoginUser = () => {
    setActiveModal("login");
  };

  const handleEditProfileUser = () => {
    setActiveModal("edit-profile");
  };

  const handleAddRecipe = () => {
    setActiveModal("add-recipe");
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
        resetCurrentForm();
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

  const handleSaveRecipe = (recipe) => {
    const token = getToken();
    if (!token) return;

    if (
      recipes.some((existingRecipe) => {
        return existingRecipe.imageUrl === recipe.imageUrl;
      })
    ) {
      const unSavedRecipe = recipes.find(
        (existingRecipe) => existingRecipe.imageUrl === recipe.imageUrl
      );
      deleteRecipeCard(unSavedRecipe._id, token)
        .then((data) => {
          setRecipes((prevRecipes) =>
            prevRecipes.filter((recipe) => recipe._id !== data.data._id)
          );
        })
        .catch((err) => console.error(err));
      return;
    }

    saveRecipe(
      {
        title: recipe.title,
        summary: recipe.summary,
        imageUrl: recipe.urlToImage,
      },
      token
    )
      .then((newRecipe) => {
        setRecipes((prevRecipes) => [...prevRecipes, newRecipe.data]);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    isValidToken(token)
      .then((res) => {
        setCurrentUser(res);
        setIsloggedIn(true);
      })
      .catch(console.error);
  }, []);

  /*useEffect(() => {
    try {
      getRecipeItems().then((data) => {
        setRecipes(data);
      });
    } catch (error) {
      console.error(error.status);
    }
  }, []); */

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/");
    }
  }, [navigate, location.pathname]);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }
    isValidToken(token)
      .then((res) => {
        setCurrentUser(res);
        setIsloggedIn(true);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="recipe-app">
      <CurrentUserContext.Provider value={currentUser}>
        <div className="recipe-app-content">
          <Header
            handleLoginUser={handleLoginUser}
            handleRegisterUser={handleRegisterUser}
            handleEditProfileUser={handleEditProfileUser}
            handleLogout={handleLogout}
            isLoggedIn={isLoggedIn}
          />
          <Routes>
            <Route
              path="/"
              element={
                <Main handleRecipeSummaryOpen={handleRecipeSummaryOpen} />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile handleAddRecipe={handleAddRecipe} recipes={recipes} />
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
        <AddRecipeModal
          onClose={closeActiveModal}
          isOpen={activeModal === "add-recipe"}
          handleAddRecipeSubmit={handleAddRecipeSubmit}
        />
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={closeActiveModal}
          setActiveModal={setActiveModal}
          closeActiveModal={closeActiveModal}
          handleRegistration={handleRegistration}
        />
        <LoginModal
          isOpen={activeModal === "login"}
          onClose={closeActiveModal}
          setActiveModal={setActiveModal}
          closeActiveModal={closeActiveModal}
          handleLogin={handleLogin}
        />
        <EditProfileModal
          onClose={closeActiveModal}
          isOpen={activeModal === "edit-profile"}
          handleEditProfile={handleEditProfile}
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
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
