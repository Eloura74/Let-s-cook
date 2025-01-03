// Sélectionner les éléments HTML
const searchInput = document.getElementById("search");
const cuisineFilter = document.getElementById("cuisineFilter");
const starFilter = document.getElementById("starFilter");
const container = document.querySelector(".container");

let recipes = []; // Stockage des recettes

// Fonction pour récupérer les données
const fetchData = async () => {
  try {
    const response = await fetch("https://dummyjson.com/recipes");
    const data = await response.json();
    recipes = data.recipes; // Stockage des recettes
    return data;
  } catch (error) {
    console.error("Erreur lors de la récupération des données:", error);
    return { recipes: [] };
  }
};

// Fonction pour filtrer les recettes
const filterRecipes = () => {
  const searchTerm = searchInput.value.toLowerCase();
  const cuisineType = cuisineFilter.value.toLowerCase();
  const starRating = parseInt(starFilter.value) || 0;

  return recipes.filter(recipe => {
    const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) ||
                         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm));
    const matchesCuisine = !cuisineType || recipe.cuisine.toLowerCase() === cuisineType;
    const matchesRating = !starRating || recipe.rating >= starRating;

    return matchesSearch && matchesCuisine && matchesRating;
  });
};

// Fonction pour afficher les recettes
const displayRecipes = (recipesToShow) => {
  container.innerHTML = ""; // Vider le conteneur

  recipesToShow.forEach(recipe => {
    const article = document.createElement("article");
    article.classList.add("recipe");
    article.innerHTML = `
      <img class="recipe__image" src="${recipe.image}" alt="${recipe.name}">
      <h2 class="recipe__title">${recipe.name}</h2>
      <div class="recipe__details">
        <span> ${recipe.rating}</span>
        <span>${recipe.cuisine}</span>
      </div>
      <p class="recipe__ingredients">${recipe.ingredients.join(", ")}</p>
    `;
    container.appendChild(article);
  });
};

// Fonction pour mettre à jour l'affichage
const updateDisplay = () => {
  const filteredRecipes = filterRecipes();
  displayRecipes(filteredRecipes);
};

// Initialisation
const init = async () => {
  await fetchData();
  updateDisplay();
};

// Event listeners
searchInput.addEventListener("input", updateDisplay);
cuisineFilter.addEventListener("change", updateDisplay);
starFilter.addEventListener("change", updateDisplay);

// Démarrer l'application
init();