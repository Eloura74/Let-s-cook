// Vérification que le fichier JavaScript est bien chargé
console.log("Fichier JavaScript chargé avec succès !");

// Sélection des éléments du DOM
const recipes = document.querySelector(".recipes");
const searchInput = document.querySelector(".search-input");
const filter1 = document.querySelector(".filter1");
const filter2 = document.querySelector(".filter2");
const ingredientFilterInput = document.querySelector(".filter3");

console.log("Éléments du DOM sélectionnés");

// Variable globale pour stocker les recettes
let recipesData = [];
// _____________________________________________________________________
// Fonction pour récupérer les données de l'API
// _____________________________________________________________________

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
// _____________________________________________________________________
// Fonction de recherche avec les filtres
// _____________________________________________________________________

const allFilter = (e) => {
  console.log("Tous les filtres sont activés");

  const searchTerm = searchInput.value.toLowerCase().trim();
  const cuisineValue = filter1.value.toLowerCase().trim();
  const starValue = parseInt(filter2.value) || 0;
  const ingredientTerm = ingredientFilterInput.value.toLowerCase().trim();

  console.log(
    `Recherche: ${searchTerm}, Cuisine: ${cuisineValue}, Étoiles: ${starValue}, Ingrédient: ${ingredientTerm}`
  );
  // filtrer les recettes
  const filtreRecipes = recipesData.filter((recipe) => {
    // verif si nom est good
    const nameGood = recipe.name.toLowerCase().includes(searchTerm);
    // verif si cuisine est good ou si rien selectionner
    const cuisineGood =
      !cuisineValue || recipe.cuisine.toLowerCase() === cuisineValue;
    // verif entreer star ou non
    const starGood = !starValue || recipe.rating >= starValue;
    // some verifie au moin un element est good
    const ingredientGood =
      !ingredientTerm ||
      recipe.ingredients.some((ingredient) =>
        ingredient.toLowerCase().includes(ingredientTerm)
      );

    console.log(
      `Nom: ${nameGood}, Cuisine: ${cuisineGood}, Étoiles: ${starGood}, Ingrédients: ${ingredientGood}`
    );
    // return true
    return nameGood && cuisineGood && starGood && ingredientGood;
  });

  console.log(`${filtreRecipes.length} recettes trouvées`);
  // affiche recette filtrees
  displayRecipes(filtreRecipes);
};
// _____________________________________________________________________
// Fonction AFFICHAGE
// _____________________________________________________________________

const displayRecipes = (recipesList) => {
  console.log(`Affichage de ${recipesList.length} recettes`);

  recipes.innerHTML = "";
  recipesList.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("recipe");

    // Limite du nombre d'ingrédients visibles par défaut
    const limitIngredientVu = 3;

    // Création de la liste des ingrédients avec une limite
    const ingredientLimit = recipe.ingredients.slice(0, limitIngredientVu);
    const ingredientRestant = recipe.ingredients.slice(limitIngredientVu);

    // Création dynamique de l'article
    article.innerHTML = `
      <h2 class="recipe-title">${recipe.name}</h2>
      <img class="recipe-image" src=${recipe.image} alt="${recipe.name}" />
      <div class="recipe-details">
        <p>⏱️ Temps de préparation: ${recipe.prepTimeMinutes} mins</p>
        <p>⭐ Note: ${recipe.rating}</p>
        <p>🍽️ Cuisine: ${recipe.cuisine}</p>
      </div>
      <p class="recipe-ingredients">
        Ingrédients:
        <button class="voirPlusBtn">En savoir plus</button>
      </p>
      <select multiple size="3" class="ingredientList">
        ${ingredientLimit
          .map((ingredient) => `<option>${ingredient}</option>`)
          .join("")}
      </select>
    `;

    // Ajout de l'article à la liste des recettes
    recipes.appendChild(article);

    // Gestion du bouton "En savoir plus"
    const voirPlusButton = article.querySelector(".voirPlusBtn");
    const ingredientList = article.querySelector(".ingredientList");

    // Événement au clic sur "En savoir plus"
    voirPlusButton.addEventListener("click", () => {
      // Ajoute les ingrédients restants à la liste déroulante
      ingredientRestant.forEach((ingredient) => {
        const option = document.createElement("option");
        option.textContent = ingredient;
        ingredientList.appendChild(option);
      });

      // Masque le bouton après avoir ajouté les ingrédients
      voirPlusButton.style.display = "none";
    });
  });

  console.log("Affichage terminé !");
};

// initialisation avec ascyns
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
// _____________________________________________________________________
// Écouteur d'événement pour la recherche et les filtres
// _____________________________________________________________________

searchInput.addEventListener("input", allFilter);
filter1.addEventListener("change", allFilter);
filter2.addEventListener("change", allFilter);
ingredientFilterInput.addEventListener("input", allFilter);

console.log("Écouteurs d'événements ajoutés");
console.log("Démarrage de l'application...");
// _____________________________________________________________________
// _____________________________________________________________________
displayData();
