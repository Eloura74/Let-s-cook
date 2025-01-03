console.log("index.js loaded");
// Fonction de recherche
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");
const filterSelect = document.querySelector(".filter");
const container = document.querySelector(".container.recipes");

searchButton.addEventListener("click", () => {
  const search = searchInput.value.toLowerCase();
  const filterType = filterSelect.value;
  console.log("Search:", search, "Filter:", filterType);

  // Clear existing recipes
  container.innerHTML = "";

  // Fetch data again to re-render recipes with filter
  const data = fetch(
    "https://dummyjson.com/recipes?limit=12&sortBy=id&order=desc"
  );

  data
    .then((raw) => raw.json())
    .then((data) => {
      console.log(data.recipes);

      // Filter recipes based on search input and filter type
      const filteredRecipes = data.recipes.filter((recipe) => {
        if (filterType === "all") {
          return recipe.name.toLowerCase().includes(search);
        } else if (filterType === "cuisine") {
          return recipe.cuisine.toLowerCase().includes(search);
        } else if (filterType === "rating") {
          return recipe.rating.toString().includes(search);
        }
      });

      // Render filtered recipes
      filteredRecipes.map((element) => {
        console.log(element);
        // utiliser createelement article
        //   creer un article
        const createElement = document.createElement("article");

        createElement.classList.add("recipe-card");
        // ajouter une classe
        const classList = createElement.classList;

        // ajouter du contenu dans l'article
        let recipeContent = `<h2 class="recipe-title">${element.name}</h2>
    
        <img class="recipe-image" src=${element.image} alt=${element.name} />
        <div class="recipe-details">
          <p>⏱️ Prep Time: ${element.prepTimeMinutes} mins</p>
          <p>⭐ Rating: ${element.rating}</p>
          <p>🍽️ Cuisine: ${element.cuisine}</p>
        </div>
        <p class="recipe-ingredients">Ingredients:</p>
        <ul>
          ${element.ingredients
            .map((ingredient) => `<li>${ingredient}</li>`)
            .join("")}
        </ul>`;

        createElement.innerHTML = recipeContent;

        // ajouter l'article dans la page
        container.appendChild(createElement);
      });
    });
});

// Initial data fetch and render
const data = fetch(
  "https://dummyjson.com/recipes?limit=12&sortBy=id&order=desc"
);

console.log("data:", data);

data
  .then((raw) => raw.json())
  .then((data) => {
    console.log(data.recipes);

    // utiliserMAP
    data.recipes.map((element) => {
      console.log(element);
      // utiliser createelement article
      //   creer un article
      const createElement = document.createElement("article");

      createElement.classList.add("recipe-card");
      // ajouter une classe
      const classList = createElement.classList;

      // ajouter du contenu dans l'article
      let recipeContent = `<h2 class="recipe-title">${element.name}</h2>
    
      <img class="recipe-image" src=${element.image} alt=${element.name} />
      <div class="recipe-details">
        <p>⏱️ Prep Time: ${element.prepTimeMinutes} mins</p>
        <p>⭐ Rating: ${element.rating}</p>
        <p>🍽️ Cuisine: ${element.cuisine}</p>
      </div>
      <p class="recipe-ingredients">Ingredients:</p>
      <ul>
        ${element.ingredients
          .map((ingredient) => `<li>${ingredient}</li>`)
          .join("")}
      </ul>`;

      createElement.innerHTML = recipeContent;

      // ajouter l'article dans la page
      container.appendChild(createElement);
    });
  });
