import "./Profile.css";
import "../RecipeSection/RecipeSection";
import RecipeSection from "../RecipeSection/RecipeSection";

function Profile({ recipes, handleRecipeSummaryOpen }) {
  return (
    <section className="profile__recipe-section">
      <RecipeSection
        recipes={recipes}
        handleRecipeSummaryOpen={handleRecipeSummaryOpen}
      />
    </section>
  );
}

export default Profile;
