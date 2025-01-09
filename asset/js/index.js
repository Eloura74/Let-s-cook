// Import des modules
import FiltreRecettes from "./filtres.js";
import Api from "./api.js";

console.log("Fichier JavaScript chargé avec succès !");

// éléments du DOM
const recipes = document.querySelector(".recipes");
const searchInput = document.querySelector(".search-input");
const filter1 = document.querySelector(".filter1");
const filter2 = document.querySelector(".filter2");
const ingredientFilterInput = document.querySelector(".filter3");

console.log("Éléments du DOM sélectionnés");

// stocker les recettes
let recipesData = [];

// classe Api
const api = new Api("https://dummyjson.com/recipes?limit=32");

// _____________________________________________________________________
// Fonction d'affichage des recettes
// _____________________________________________________________________

const displayRecipes = (recipesList) => {
  recipes.innerHTML = "";

  recipesList.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("recipe");

    // Limiter a 6 ingrédients
    const maxVisibleIngredients = 6;
    const visibleIngredients = recipe.ingredients.slice(
      0,
      maxVisibleIngredients
    );

    article.innerHTML = `
      <h2 class="recipe-title">${recipe.name}</h2>
      <img class="recipe-image" src=${recipe.image} alt="${recipe.name}" />
      <div class="recipe-details">
        <p>⏱️ Préparation: ${recipe.prepTimeMinutes} mins</p>
        <p>⭐ Note: ${recipe.rating}</p>
        <p>🍽️ Cuisine: ${recipe.cuisine}</p>
      </div>
      <button class="voirPlusBtn">En savoir plus</button>
      <div>
        <p class="titleIngredient">Ingrédients :</p>
        <div>
          <ul class="ingredientList">
            ${visibleIngredients
              .map((ingredient) => `<li>${ingredient}</li>`)
              .join("")}
          </ul>
        </div>
      </div>
    `;
    recipes.appendChild(article);
    console.log("cuisineFilter");
    // bouton "En savoir plus"
    const voirPlusButton = article.querySelector(".voirPlusBtn");
    voirPlusButton.addEventListener("click", () => {
      openDetail(recipe.id);
    });
  });
};

// _____________________________________________________________________
// Fonction pour ouvrir les détails d'une recette
// _____________________________________________________________________
const openDetail = (recipeId) => {
  const url = `http://127.0.0.1:5500/index.html?id=${recipeId}`;
  window.open(url, "_blank");
};

// _____________________________________________________________________
// Initialiser la classe FiltreRecettes
// _____________________________________________________________________
let filtreRecettes;

const displayData = async () => {
  recipes.innerHTML = "Chargement en cours...";
  try {
    // Utiliser l'instance de la classe Api pour récupérer les données
    const data = await api.fetchData();
    recipesData = data.recipes;

    // Afficher les recettes et initialiser les filtres
    displayRecipes(recipesData);
    filtreRecettes = new FiltreRecettes(recipesData, displayRecipes);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
};

// _____________________________________________________________________
// Fonction pour gérer les filtres et les événements
// _____________________________________________________________________
const allFilter = () => {
  const searchTerm = searchInput.value.toLowerCase().trim();
  const cuisineValue = filter1.value.toLowerCase().trim();
  const starValue = parseInt(filter2.value) || 0;
  const ingredientTerm = ingredientFilterInput.value.toLowerCase().trim();

  filtreRecettes.filtrerEtAfficher(
    searchTerm,
    cuisineValue,
    starValue,
    ingredientTerm
  );
};

// Ajouter les écouteurs d'événements
searchInput.addEventListener("input", allFilter);
filter1.addEventListener("change", allFilter);
filter2.addEventListener("change", allFilter);
ingredientFilterInput.addEventListener("input", allFilter);

// console.log("Écouteurs d'événements ajoutés");
console.log("Démarrage de l'application...");

// Lancer l'application
displayData();
