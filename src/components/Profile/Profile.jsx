import "./Profile.css";
import "../RecipeSection/RecipeSection";
import RecipeSection from "../RecipeSection/RecipeSection";

function Profile({
  recipes,
  handleRecipeSummaryOpen,
  handleAddRecipe,
  addFavorite,
}) {
  return (
    <section className="profile__recipe-section">
      <RecipeSection
        addFavorite={addFavorite}
        recipes={recipes}
        handleAddRecipe={handleAddRecipe}
        handleRecipeSummaryOpen={handleRecipeSummaryOpen}
      />
    </section>
  );
}

export default Profile;
