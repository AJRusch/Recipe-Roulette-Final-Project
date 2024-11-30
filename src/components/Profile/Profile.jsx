import "./Profile.css";
import "../RecipeSection/RecipeSection";
import RecipeSection from "../RecipeSection/RecipeSection";

function Profile({
  handleRecipeSummaryOpen,
  handleFavorite,
  handleSaveRecipe,
  savedRecipes,
}) {
  return (
    <section className="profile__recipe-section">
      <RecipeSection
        handleFavorite={handleFavorite}
        handleSaveRecipe={handleSaveRecipe}
        savedRecipes={savedRecipes}
        handleRecipeSummaryOpen={handleRecipeSummaryOpen}
      />
    </section>
  );
}

export default Profile;
