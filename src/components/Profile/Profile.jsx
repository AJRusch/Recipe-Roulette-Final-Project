import "./Profile.css";
import "../RecipeSection/RecipeSection";
import RecipeSection from "../RecipeSection/RecipeSection";

function Profile({
  recipes,
  handleRecipeSummaryOpen,
  handleAddRecipe,
  handleFavorite,
}) {
  return (
    <section className="profile__recipe-section">
      <RecipeSection
        handleFavorite={handleFavorite}
        recipes={recipes}
        handleAddRecipe={handleAddRecipe}
        handleRecipeSummaryOpen={handleRecipeSummaryOpen}
      />
    </section>
  );
}

export default Profile;
