const displayRecipesRecettes = (recipesList) => {
  recipes.innerHTML = "";

  recipesList.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("recipe");

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
              <li>${ingredient}</li>
            </ul>
          </div>
        </div>
      `;
    // recipes.appendChild(article);
    // console.log("cuisineFilter");
    // // bouton "En savoir plus"
    // const voirPlusButton = article.querySelector(".voirPlusBtn");
    // voirPlusButton.addEventListener("click", () => {
    //   openDetail(recipe.id);
    // });
  });
};

// Récupérer l'ID de la recette depuis l'URL
const urlParams = new URLSearchParams(window.location.search);
const recipeId = urlParams.get("id");

// Fonction pour récupérer les détails de la recette
async function fetchRecipeDetails() {
  try {
    const response = await fetch(`https://dummyjson.com/recipes/${recipeId}`);
    const recipe = await response.json();
    displayRecipeDetails(recipe);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la recette:",
      error
    );
  }
}

// Fonction pour afficher les détails de la recette
function displayRecipeDetails(recipe) {
  const mainContent = document.querySelector("main");
  mainContent.innerHTML = `
    <div class="recipe-detail">
      <h1>${recipe.name}</h1>
      <img src="${recipe.image}" alt="${
    recipe.name
  }" class="recipe-detail-image">
      <div class="recipe-info">
        <p>⏱️ Temps de préparation: ${recipe.prepTimeMinutes} minutes</p>
        <p>⭐ Note: ${recipe.rating}/5</p>
        <p>🍽️ Cuisine: ${recipe.cuisine}</p>
        <p>👥 Pour ${recipe.servings} personnes</p>
      </div>
      <div class="recipe-ingredients">
        <h2>Ingrédients</h2>
        <ul>
          ${recipe.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}
        </ul>
      </div>
      <div class="recipe-instructions">
        <h2>Instructions</h2>
        <ol>
          ${recipe.instructions
            .map((instruction) => `<li>${instruction}</li>`)
            .join("")}
        </ol>
      </div>
    </div>
  `;
}

// Appeler la fonction au chargement de la page
if (recipeId) {
  fetchRecipeDetails();
} else {
  console.error("Aucun ID de recette trouvé dans l'URL");
}
