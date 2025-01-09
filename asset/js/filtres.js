export class FiltreNom {
  constructor(searchInput, recipesData) {
    this.searchInput = searchInput; // Input pour le nom de la recette

    this.recipesData = recipesData; // Tableau des données des recettes
  }

  // Méthode pour récupérer les filtres
  getFilters() {
    return {
      searchTerm: this.searchInput.value.toLowerCase().trim(),
    };
  }

  // Méthode pour effectuer le filtrage
  filterRecipesName() {
    const { searchTerm } = this.getFilters();

    return this.recipesData.filter((recipe) => {
      // Vérifier si le nom correspond à la recherche
      const nameGood = recipe.name.toLowerCase().includes(searchTerm);

      // Retourner true si tous les critères sont satisfaits
      return nameGood;
    });
  }

  // Méthode pour appliquer le filtrage et mettre à jour l'interface
  applyFilters(callback) {
    const filteredRecipes = this.filterRecipesName();
    if (typeof callback === "function") {
      callback(filteredRecipes); // Appeler une fonction de rappel pour mettre à jour l'interface
    }
  }
}
