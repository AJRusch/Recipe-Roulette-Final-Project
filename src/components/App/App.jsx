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
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
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
  getRecipeItems,
} from "../../utils/api";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoggedIn, setIsloggedIn] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();

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

    const savedRecipe = savedRecipes.find((existingRecipe) => {
      return existingRecipe.imageUrl === recipe.imageUrl;
    });
    if (savedRecipe) {
      console.log(recipes);
      console.log(recipe);
      const unSavedRecipe = [...recommended, ...recipes].find(
        (existingRecipe) => existingRecipe.imageUrl === recipe.imageUrl
      );
      console.log(savedRecipe);
      deleteRecipeCard(savedRecipe._id, token)
        .then((data) => {
          console.log(savedRecipes);
          console.log(data.recipe);
          setSavedRecipes((prevRecipes) =>
            prevRecipes.filter((recipe) => recipe._id !== data.recipe._id)
          );
        })
        .catch((err) => console.error(err));
      return;
    }

    saveRecipe(
      {
        title: recipe.title,
        summary: recipe.summary,
        image: recipe.sourceUrl,
      },
      token
    )
      .then((newRecipe) => {
        setSavedRecipes((prevRecipes) => [...prevRecipes, newRecipe.data]);
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

  useEffect(() => {
    const token = getToken();
    try {
      getRecipeItems(token).then((data) => {
        setSavedRecipes(data);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

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
                <Main
                  handleRecipeSummaryOpen={handleRecipeSummaryOpen}
                  handleSaveRecipe={handleSaveRecipe}
                  recommended={recommended}
                  setRecommended={setRecommended}
                />
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    handleAddRecipe={handleAddRecipe}
                    recipes={recipes}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/searched"
              element={
                <SearchedRecipes
                  handleRecipeSummaryOpen={handleRecipeSummaryOpen}
                  handleSaveRecipe={handleSaveRecipe}
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
