// Vérification que le fichier JavaScript est bien chargé
console.log("Fichier JavaScript chargé avec succès !");

// Sélection des éléments du DOM
const recipes = document.querySelector(".recipes");
const searchInput = document.querySelector(".search-input");
console.log("Éléments du DOM sélectionnés");

// Variable globale pour stocker les recettes
let recipesData = [];

// Fonction pour récupérer les données de l'API
const fetchData = async () => {
  console.log("Début du chargement des recettes depuis l'API...");
  const response = await fetch(`https://dummyjson.com/recipes?limit=24`);
  const data = await response.json();
  recipesData = data.recipes;
  console.log(`${recipesData.length} recettes chargées avec succès !`);
  return data;
};

// Fonction de recherche simple
const searchRecipes = () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  console.log(`Recherche en cours pour : "${searchTerm}"`);

  // Filtrer les recettes par nom
  const searchResults = recipesData.filter((recipe) => 
    recipe.name.toLowerCase().includes(searchTerm)
  );
  console.log(`${searchResults.length} recettes trouvées`);

  // Afficher les résultats
  displayRecipes(searchResults);
};

// Fonction d'affichage des recettes
const displayRecipes = (recipesList) => {
  console.log(`Affichage de ${recipesList.length} recettes`);
  // Nettoyage du conteneur
  recipes.innerHTML = "";

  // Création des cartes de recettes
  recipesList.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("recipe");
    article.innerHTML = `
        <h2 class="recipe-title">${recipe.name}</h2>
        <img class="recipe-image" src=${recipe.image} alt=${recipe.name} />
        <div class="recipe-details">
          <p>⏱️ Temps de préparation: ${recipe.prepTimeMinutes} mins</p>
          <p>⭐ Note: ${recipe.rating}</p>
          <p>🍽️ Cuisine: ${recipe.cuisine}</p>
        </div>
        <p class="recipe-ingredients">Ingrédients:</p>
        <ul>
          ${recipe.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}
        </ul>`;
    recipes.appendChild(article);
  });
  console.log("Affichage terminé !");
};

// Fonction d'initialisation
const displayData = async () => {
  console.log("Initialisation de l'application...");
  recipes.innerHTML = "Chargement en cours...";
  const data = await fetchData();
  displayRecipes(data.recipes);
  console.log("Application initialisée avec succès !");
};

// Écouteur d'événement pour la recherche
searchInput.addEventListener("input", searchRecipes);
console.log("Écouteur d'événement de recherche ajouté");

// Lancement de l'application
console.log("Démarrage de l'application...");
displayData();
