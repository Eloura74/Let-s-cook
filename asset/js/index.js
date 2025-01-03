// Vérification que le fichier JavaScript est bien chargé
console.log("Fichier JavaScript chargé avec succès !");

// Sélection des éléments du DOM nécessaires pour l'application
// recipes : conteneur principal pour afficher les recettes
// searchInput : champ de recherche pour filtrer les recettes
// filter1 : premier filtre (type de cuisine)
// filter2 : deuxième filtre (note minimale)
const recipes = document.querySelector(".recipes");
const searchInput = document.querySelector(".search-input");
const filter1 = document.querySelector(".filter1");
const filter2 = document.querySelector(".filter2");
console.log("Éléments du DOM sélectionnés");

// Variables globales pour stocker les données
// recipesData : tableau contenant toutes les recettes
// filter : tableau pour les filtres appliqués
// limit : tableau pour la limitation des résultats
let recipesData = [];
let filter = [];


// Fonction asynchrone pour récupérer les données des recettes depuis l'API
// Utilise fetch pour obtenir 32 recettes maximum, triées par nom
const fetchData = async () => {
  try {
    const response = await fetch(
      `https://dummyjson.com/recipes?limit=32&sortBy=name&order=asc&search?q=${searchInput.value}`
    );
// Convertit la réponse de la requête en un objet JSON (cela transforme le flux de données en un format utilisable)
const data = await response.json(); 
// Stocke les données des recettes obtenues dans une variable globale ou locale appelée `recipesData`
recipesData = data.recipes; 
// Renvoie les données complètes récupérées par la requête (permet de les utiliser dans d'autres parties du code)
return data; 
// Bloc pour gérer les erreurs en cas de problème dans la récupération des données
} catch (error) { 
  // Affiche un message d'erreur dans la console pour alerter le développeur d'un problème
  console.error( 
    "Une erreur s'est produite lors de la recherche des recettes :", 
    error // Affiche également les détails spécifiques de l'erreur dans la console
  ); 
}
};


// Fonction principale de filtrage des recettes
// Gère la recherche par nom, le filtre par cuisine et le filtre par note
const allFilter = (e) => {
  console.log("Tous les filtres sont activés");

  // Normalisation de la recherche (minuscules et suppression des espaces)
  const searchTerm = searchInput.value.toLowerCase().trim();
  console.log(e);
  console.log(`Recherche en cours pour : "${searchTerm}"`);

  // Récupération et normalisation du filtre cuisine
  const cuisineValue = filter1.value.toLowerCase().trim();
  console.log(`Filtre 1 en cours pour : "${cuisineValue}"`);

  // Conversion du filtre étoiles en nombre (0 si non spécifié)
  const starValue = parseInt(filter2.value) || 0;
  console.log(`Filtre 2 en cours pour : "${starValue}"`);
  console.log(
    `Application des filtres - Recherche: ${searchTerm}, Cuisine: ${cuisineValue}, Étoiles: ${starValue}`
  );

  // Application des filtres sur les recettes
  const filtreRecipes = recipesData.filter((recipe) => {
    // Vérifie si le nom correspond à la recherche
    const nameGood = recipe.name.toLowerCase().includes(searchTerm);
    console.log(`Nom : ${nameGood}`);

    // Vérifie si la cuisine correspond au filtre
    const cuisineGood =
      !cuisineValue || recipe.cuisine.toLowerCase() === cuisineValue;
    console.log(`Cuisine : ${cuisineGood}`);

    // Vérifie si la note est suffisante
    // Si starValue est 0 (!starValue est vrai), accepte toutes les notes
    // Sinon, vérifie si la note de la recette est supérieure ou égale à celle demandée
    const starGood = !starValue || recipe.rating >= starValue;
    console.log(`Étoiles : ${starGood}`);

    // Retourne true si tous les critères sont satisfait
    return nameGood && cuisineGood && starGood;
  });

  console.log(`${filtreRecipes.length} recettes trouvées`);

  displayRecipes(filtreRecipes);
};

// Fonction d'affichage des recettes filtrées
// Crée une carte HTML pour chaque recette avec ses détails
const displayRecipes = (recipesList) => {
  console.log(`Affichage de ${recipesList.length} recettes`);

  // Nettoyage du conteneur
  recipes.innerHTML = "";

  // Création des cartes de recettes
  recipesList.forEach((recipe) => {
    const article = document.createElement("article");
    article.classList.add("recipe");
    article.innerHTML = `
      <div class="recipe-card">
        <div class="recipe-front">
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
          </ul>
        </div>
        <div class="recipe-back">
          <h2 class="recipe-title">Instructions</h2>
          <div class="recipe-instructions">
            ${recipe.instructions}
          </div>
          <button class="flip-button">Retour à la recette</button>
        </div>
      </div>`;

    // Gestion du clic
    article.addEventListener('click', (e) => {
      // Ignore le clic sur le bouton retour
      if (e.target.classList.contains('flip-button')) {
        e.stopPropagation();
        article.querySelector('.recipe-card').classList.remove('is-flipped');
        return;
      }

      const card = article.querySelector('.recipe-card');
      const isCurrentlyFlipped = card.classList.contains('is-flipped');

      // Retourne toutes les autres cartes à leur position initiale
      document.querySelectorAll('.recipe-card.is-flipped').forEach(flippedCard => {
        flippedCard.classList.remove('is-flipped');
      });

      // Si la carte n'était pas retournée, on la retourne
      if (!isCurrentlyFlipped) {
        card.classList.add('is-flipped');
      }
      // Si elle était retournée, elle reste en position initiale (car on l'a déjà remise avec le querySelectorAll)
    });

    recipes.appendChild(article);
  });
  console.log("Affichage terminé !");
};

// Fonction d'initialisation de l'application
// Affiche un message de chargement puis récupère et affiche les recettes
// Fonction asynchrone appelée pour afficher les données des recettes
const displayData = async () => {

  // Modifie le contenu HTML de l'élément `recipes` pour indiquer que le chargement est en cours
  recipes.innerHTML = "Chargement en cours...";

  try {
    // Appelle la fonction fetchData pour récupérer les données des recettes via une requête
    const data = await fetchData();

    // Passe les recettes récupérées à la fonction displayRecipes pour les afficher à l'écran
    displayRecipes(data.recipes);
  } catch (error) {
    // En cas d'erreur, affiche un message explicite dans la console pour signaler le problème
    console.error(
      "Une erreur s'est produite lors de la recherche des recettes :", 
      error // Fournit des détails spécifiques sur l'erreur rencontrée
    );
  }
};


// Mise en place des écouteurs d'événements pour la recherche en temps réel
// Chaque fois que le champ de recherche est modifié, la fonction allFilter est appelée
searchInput.addEventListener("input", allFilter);
filter1.addEventListener("change", allFilter);
filter2.addEventListener("change", allFilter);

console.log("Écouteurs d'événements ajoutés");

// Lancement de l'application
console.log(" Démarrage de l'application...");
displayData();
