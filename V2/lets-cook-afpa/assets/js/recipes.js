export default class Recipe {
  recipeContainer = "";
  constructor(
    recipesSelector,
    searchBarSelector,
    filter1Selector,
    filter2Selector
  ) {
    try {
      // Sélection des éléments HTML
      this.recipeContainer = document.querySelector(recipesSelector);
      this.searchBarElement = document.querySelector(searchBarSelector);
      this.filter1Element = document.querySelector(filter1Selector);
      this.filter2Element = document.querySelector(filter2Selector);

      // Vérification des éléments requis
      if (
        !this.recipeContainer ||
        !this.searchBarElement ||
        !this.filter1Element ||
        !this.filter2Element
      ) {
        throw new Error(
          "Un ou plusieurs éléments HTML requis sont introuvables."
        );
      }

      // Initialisation des propriétés
      this.currentKeyWord = "";
      this.currentFilter = "";
      this.currentLimit = 12;

      // Définition des méthodes comme fléchées
      this.handleSearchInput = (event) => {
        try {
          this.currentKeyWord = event.target.value.trim().toLowerCase();
          console.log("currentKeyWord :", this.currentKeyWord);
          this.displayData(
            this.currentKeyWord,
            this.currentFilter,
            this.currentLimit
          );
        } catch (error) {
          console.error("Erreur dans handleSearchInput : ", error.message);
        }
      };

      this.handleFilter1Change = (event) => {
        try {
          switch (event.target.value) {
            case "name-asc":
              this.currentFilter = "sortBy=name&order=asc";
              break;
            case "name-desc":
              this.currentFilter = "sortBy=name&order=desc";
              break;
            case "id-asc":
              this.currentFilter = "sortBy=id&order=asc";
              break;
            case "id-desc":
              this.currentFilter = "sortBy=id&order=desc";
              break;
            default:
              this.currentFilter = "";
          }
          this.displayData(
            this.currentKeyWord,
            this.currentFilter,
            this.currentLimit
          );
        } catch (error) {
          console.error("Erreur dans handleFilter1Change : ", error.message);
        }
      };

      this.handleFilter2Change = (event) => {
        try {
          switch (event.target.value) {
            case "4":
              this.currentLimit = 4;
              break;
            case "8":
              this.currentLimit = 8;
              break;
            case "12":
              this.currentLimit = 12;
              break;
            case "24":
              this.currentLimit = 24;
              break;
            case "36":
              this.currentLimit = 36;
              break;
            default:
              this.currentLimit = "";
          }
          this.displayData(
            this.currentKeyWord,
            this.currentFilter,
            this.currentLimit
          );
        } catch (error) {
          console.error("Erreur dans handleFilter2Change : ", error.message);
        }
      };

      // Initialisation de l'application
      this.init();
    } catch (error) {
      console.error("Erreur dans le constructeur : ", error.message);
    }
  }

  async fetchData(keyWord = "", filterSortBy = "", limit = 12) {
    try {
      const queryKeyWord = keyWord ? `/search?q=${keyWord}` : "";
      const queryFilter = filterSortBy
        ? `${queryKeyWord ? "&" : "?"}${filterSortBy}`
        : "";
      const queryLimit = limit
        ? `${queryKeyWord || queryFilter ? "&" : "?"}limit=${limit}`
        : "";

      const url = `https://dummyjson.com/recipes${queryKeyWord}${queryFilter}${queryLimit}`;
      console.log("URL générée : ", url);

      const response = await fetch(url);

      // Vérification de la réponse
      if (!response.ok) {
        throw new Error(
          `Échec de la requête : ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Vérification des données reçues
      if (!data || typeof data !== "object") {
        throw new Error("Les données reçues sont invalides.");
      }

      return data;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération des données : ",
        error.message
      );
      this.recipeContainer.innerHTML =
        "<p>Erreur lors de la récupération des données. Veuillez réessayer plus tard.</p>";
      return { recipes: [] }; // Retourne un tableau vide pour éviter les erreurs dans `displayData`
    }
  }

  async displayData(keyWord = "", filterSortBy = "", limit = 12) {
    try {
      this.recipeContainer.innerHTML = "Chargement en cours...";

      const data = await this.fetchData(keyWord, filterSortBy, limit);

      this.recipeContainer.innerHTML = "";

      // Vérification de la présence des recettes
      if (!data.recipes || data.recipes.length === 0) {
        this.recipeContainer.innerHTML = "<p>Aucune recette trouvée.</p>";
        return;
      }

      data.recipes.forEach((recipe) => {
        const article = document.createElement("article");
        article.classList.add("recipe");
        article.innerHTML = `
            <div class="recipe__image-container">
              <img class="recipe__image" src="${recipe.image}" alt="${recipe.title}" loading="lazy">
            </div>
            <h3 class="recipe__title">${recipe.name} - ${recipe.id}</h3>
            <p class="recipe__ingredients">${recipe.ingredients}</p>
            <p class="recipe__links">
              <a href="recette.html?id=${recipe.id}&name=${recipe.name}">Voir la recette →</a>
            </p>
          `;
        this.recipeContainer.appendChild(article);
      });
    } catch (error) {
      console.error("Erreur lors de l'affichage des données : ", error.message);
      this.recipeContainer.innerHTML =
        "<p>Erreur lors de l'affichage des données. Veuillez réessayer plus tard.</p>";
    }
  }

  init() {
    try {
      if (
        !this.searchBarElement ||
        !this.filter1Element ||
        !this.filter2Element
      ) {
        throw new Error(
          "Les éléments requis pour l'initialisation ne sont pas disponibles."
        );
      }
      this.searchBarElement.addEventListener("input", this.handleSearchInput);
      this.filter1Element.addEventListener("change", this.handleFilter1Change);
      this.filter2Element.addEventListener("change", this.handleFilter2Change);
      this.displayData();
    } catch (error) {
      console.error("Erreur dans l'initialisation : ", error.message);
    }
  }
}

// Exemple d'utilisation
// const recipesApp = new Recipe(".recipes", ".search-bar", "#filter1", "#filter2");
// recipesApp.init();
