import "./Profile.css";
import "../RecipeSection/RecipeSection";
import RecipeSection from "../RecipeSection/RecipeSection";

function Profile({
  savedRecipes,
  handleRecipeSummaryOpen,
  handleFavorite,
  handleSaveRecipe,
}) {
  return (
    <section className="profile__recipe-section">
      <RecipeSection
        handleFavorite={handleFavorite}
        savedRecipes={savedRecipes}
        handleSaveRecipe={handleSaveRecipe}
        handleRecipeSummaryOpen={handleRecipeSummaryOpen}
      />
    </section>
  );
}

export default Profile;
