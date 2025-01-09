console.log("Fichier JavaScript chargé avec succès !");

// éléments du DOM
const recipes = document.querySelector(".recipes");
const searchInput = document.querySelector(".search-input");
const filter1 = document.querySelector(".filter1");
const filter2 = document.querySelector(".filter2");
const ingredientFilterInput = document.querySelector(".filter3");

console.log("Éléments du DOM sélectionnés");

//stocker les recettes
let recipesData = [];

// _____________________________________________________________________
// Fonction pour récupérer les données de l'API
// _____________________________________________________________________

const fetchData = async () => {
  try {
    const response = await fetch(`https://dummyjson.com/recipes?limit=32`);
    const data = await response.json();
    recipesData = data.recipes;
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des recettes :", error);
  }
};

// _____________________________________________________________________
// Fonction  filtres
// _____________________________________________________________________

const allFilter = () => {
  const searchTerm = searchInput.value.toLowerCase().trim(); //nom de recette
  const cuisineValue = filter1.value.toLowerCase().trim(); // type de cuisine
  const starValue = parseInt(filter2.value) || 0; // note
  const ingredientTerm = ingredientFilterInput.value.toLowerCase().trim(); // ingrédient

  // Filtrer
  const filteredRecipes = recipesData.filter((recipe) => {
    // nom correspond a recherche
    const nameGood = recipe.name.toLowerCase().includes(searchTerm);

    // cuisine correspond a selection
    const cuisineGood =
      !cuisineValue || recipe.cuisine.toLowerCase() === cuisineValue;

    // note correspond a selection
    const starGood = !starValue || recipe.rating >= starValue;

    // ingrédient correspond a recherche
    const ingredientGood =
      !ingredientTerm ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(ingredientTerm)
      );

    // true si tout ok
    return nameGood && cuisineGood && starGood && ingredientGood;
  });

  // Affichage
  displayRecipes(filteredRecipes);
};

// _____________________________________________________________________
// Fonction d'affichage des recettes
// _____________________________________________________________________

const displayRecipes = (recipesList) => {
  recipes.innerHTML = "";

  recipesList.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("recipe");

    // Création dynamique du contenu HTML de chaque recette
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
        <p>Ingrédients :
        </p>
        <div>
      <ul class="ingredientList">
        ${recipe.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
      </ul>
        </div>
      </div>
    `;

    recipes.appendChild(article);

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
  const url = `https://dummyjson.com/recipes/${recipeId}`;
  window.open(url, "_blank");
};

// _____________________________________________________________________
// Fonction d'initialisation
// _____________________________________________________________________

const displayData = async () => {
  recipes.innerHTML = "Chargement en cours...";
  try {
    const data = await fetchData();
    displayRecipes(data.recipes);
  } catch (error) {
    console.error("Erreur lors du chargement des données :", error);
  }
};

// _____________________________________________________________________
// Écouteurs d'événements pour les filtres
// _____________________________________________________________________

searchInput.addEventListener("input", allFilter);
filter1.addEventListener("change", allFilter);
filter2.addEventListener("change", allFilter);
ingredientFilterInput.addEventListener("input", allFilter);

console.log("Écouteurs d'événements ajoutés");
console.log("Démarrage de l'application...");

// Lancer l'application
displayData();
