//  Import
import Recipe from "./recipes.js";
import { sayHello } from "./button.js";

console.log(Recipe);

//  Instanciation de la classe
const recipesApp = new Recipe(
  ".recipes",
  ".search-bar",
  "#filter1",
  "#filter2"
);

//  Initialiser l'objet
recipesApp.init();
buttonX.addEventListener("click", sayHello);
