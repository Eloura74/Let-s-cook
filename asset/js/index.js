// Vérification que le fichier JavaScript est bien chargé
console.log("Fichier JavaScript chargé avec succès !");

// Sélection des éléments du DOM

const recipes = document.querySelector(".recipes");
const searchInput = document.querySelector(".search-input");
const filter1 = document.querySelector(".filter1");
const filter2 = document.querySelector(".filter2");
console.log("Éléments du DOM sélectionnés");

// Variable globale pour stocker les recettes

let recipesData = [];
let filter = [];
let limit = [];

// Fonction pour récupérer les données de l'API
const fetchData = async () => {
  try {
    const response = await fetch(
      `https://dummyjson.com/recipes?limit=32&sortBy=name&order=asc&search?q=${searchInput.value}`
    );
    const data = await response.json();
    recipesData = data.recipes;
    return data;
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la recherche des recettes :",
      error
    );
  }
};

// Fonction de recherche simple
const allFilter = (e) => {
  console.log("Tous les filtres sont activés");

  // Récupère la valeur de recherche, la convertit en minuscules et enlève les espaces inutiles
  const searchTerm = searchInput.value.toLowerCase().trim();
  console.log(e);
  console.log(`Recherche en cours pour : "${searchTerm}"`);

  // Récupère la valeur du filtre cuisine (premier select) et la normalise
  const cuisineValue = filter1.value.toLowerCase().trim();
  console.log(`Filtre 1 en cours pour : "${cuisineValue}"`);

  // Récupère la valeur du filtre étoiles (deuxième select) et la convertit en nombre
  // Si la conversion échoue (pas de valeur), utilise 0 comme valeur par défaut
  const starValue = parseInt(filter2.value) || 0;
  console.log(`Filtre 2 en cours pour : "${starValue}"`);
  console.log(
    `Application des filtres - Recherche: ${searchTerm}, Cuisine: ${cuisineValue}, Étoiles: ${starValue}`
  );

  // Filtrage des recettes : on applique tous les critères de filtrage sur chaque recette
  const filtreRecipes = recipesData.filter((recipe) => {
    // Vérifie si le nom de la recette contient le terme recherché
    const nameGood = recipe.name.toLowerCase().includes(searchTerm);
    console.log(`Nom : ${nameGood}`);

    // Vérifie si la cuisine correspond
    // Si cuisineValue est vide (!cuisineValue est vrai), accepte toutes les cuisines
    // Sinon, vérifie si la cuisine de la recette correspond exactement à celle sélectionnée
    const cuisineGood =
      !cuisineValue || recipe.cuisine.toLowerCase() === cuisineValue;
    console.log(`Cuisine : ${cuisineGood}`);

    // Vérifie si la note est suffisante
    // Si starValue est 0 (!starValue est vrai), accepte toutes les notes
    // Sinon, vérifie si la note de la recette est supérieure ou égale à celle demandée
    const starGood = !starValue || recipe.rating >= starValue;
    console.log(`Étoiles : ${starGood}`);

    // Retourne true seulement si TOUS les critères sont satisfaits (ET logique)
    return nameGood && cuisineGood && starGood;
  });

  console.log(`${filtreRecipes.length} recettes trouvées`);

  displayRecipes(filtreRecipes);
};

// ______________________________________________________________________

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
  recipes.innerHTML = "Chargement en cours...";
  try {
    const data = await fetchData();
    displayRecipes(data.recipes);
  } catch (error) {
    console.error(
      "Une erreur s'est produite lors de la recherche des recettes :",
      error
    );
  }
};

// Écouteur d'événement pour la recherche et les filtres
searchInput.addEventListener("input", allFilter);
filter1.addEventListener("change", allFilter);
filter2.addEventListener("change", allFilter);

console.log("Écouteurs d'événements ajoutés");

// Lancement de l'application
console.log("Démarrage de l'application...");

displayData();
