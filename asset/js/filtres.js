export default class FiltreRecettes {
  constructor(recipesData, displayRecipesCallback) {
    this.recipesData = recipesData; // Données des recettes
    this.displayRecipes = displayRecipesCallback; // Fonction d'affichage
  }

  appliquerFiltres(searchTerm, cuisineValue, starValue, ingredientTerm) {
    // Filtrer les recettes
    return this.recipesData.filter((recipe) => {
      const nameGood = recipe.name.toLowerCase().includes(searchTerm);
      const cuisineGood =
        !cuisineValue || recipe.cuisine.toLowerCase() === cuisineValue;
      const starGood = !starValue || recipe.rating >= starValue;
      const ingredientGood =
        !ingredientTerm ||
        recipe.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(ingredientTerm)
        );

      return nameGood && cuisineGood && starGood && ingredientGood;
    });
  }

  filtrerEtAfficher(searchTerm, cuisineValue, starValue, ingredientTerm) {
    const filteredRecipes = this.appliquerFiltres(
      searchTerm,
      cuisineValue,
      starValue,
      ingredientTerm
    );
    this.displayRecipes(filteredRecipes);
  }
}
