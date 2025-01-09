console.log("Loading");

// selection des element du DOM
const recipeContainer = document.querySelector(".recipes");
const searchBarElement = document.querySelector(".search-bar");
const filter1Element = document.querySelector("#filter1");
const filter2Element = document.querySelector("#filter2");

// Stocker filtre actuelle et valeur utilisateur
let currentKeyWord = "";
let currentFilter = "";
let currentLimit = "";

// Fonction recuperation donées API
const fetchData = async (keyWord = "", filterSortBy = "", limit = "12") => {
  //  composition de l'url

  try {
    const queryKeyWord = keyWord ? `/search?q=${keyWord}` : "";
    const queryFilterd = filterSortBy
      ? `${queryKeyWord ? "&" : "?"}${filterSortBy}`
      : "";
    const queryLimit = limit
      ? `${queryKeyWord || queryFilterd ? "&" : "?"}limit=${limit}`
      : "";
    // definir url
    const url = `https://dummyjson.com/recipes${queryKeyWord}${queryFilterd}${queryLimit}`;
    console.log(url);
    // https://.. endPoint de API
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    // retourne promise
    return data;
  } catch (error) {
    console.log("probleme de requete https", error);
  }
};

fetchData(currentKeyWord, currentFilter, currentLimit);
console.log(fetchData());

const displayData = async (keyWord, filterSortBy, limit) => {
  try {
    recipeContainer.innerHTML = "Chargement en cours...";
    const data = await fetchData(keyWord, filterSortBy, limit);
    recipeContainer.innerHTML = "";
    // si l'utilisateur ne met rien
    if (!data.recipes || data.recipes.length === 0) {
      recipeContainer.innerHTML = "<p>Aucune recette trouvee</p>";
      return;
    }

    data.recipes.forEach((element) => {
      const article = document.createElement("article");
      article.classList.add("recipe");
      article.innerHTML = `
            <div class="recipe__image-container">
              <img class="recipe__image" src="${element.image}" alt="${element.title}">
            </div>
            <h3 class="recipe__title">${element.name} - ${element.id}</h3>
            <p class="recipe__ingredients">${element.ingredients}</p>
            <p class="recipe__links">
              <a href="recette.html?id=${element.id}&name=${element.name}">Voir la recette →</a>
            </p>
          `;
      recipeContainer.appendChild(article);
    });
  } catch (error) {
    console.log("probleme de requete https", error);
  }
};
// appel initial
displayData();

//  ecouteur evenement utilisateur
searchBarElement.addEventListener("input", (event) => {
  //   console.log(event.target.value);
  currentKeyWord = event.target.value;
  //   console.log(currentKeyWord);
  displayData(currentKeyWord, currentFilter, currentLimit);
});
filter1Element.addEventListener("change", (event) => {
  //   currentFilter = event.target.value;
  //   displayData(currentKeyWord, currentFilter, currentLimit);
  //  e.target.value ?
  // e.target.value ?
  let value = "";
  // remplace else if elseif else if......
  switch (event.target.value) {
    case "name-asc":
      value = "sortBy=name&order=asc";
      break;
    case "name-desc":
      value = "sortBy=name&order=desc";
      break;
    case "id-asc":
      value = "sortBy=id&order=asc";
      break;
    case "id-desc":
      value = "sortBy=id&order=desc";
      break;
    default:
      value = "";
      break;
  }
  currentFilter = value;
  displayData(currentKeyWord, currentFilter, currentLimit);
  console.log(currentFilter);
});

filter2Element.addEventListener("change", (event) => {
  let value = "";
  switch (event.target.value) {
    case "4":
      value = 4;
      break;
    case "8":
      value = 8;
      break;
    case "12":
      value = 12;
      break;
    case "24":
      value = 24;
      break;
    case "36":
      value = 36;
      break;
    default:
      value = "";
      break;
  }
  currentLimit = value;
  displayData(currentKeyWord, currentFilter, currentLimit);
});
