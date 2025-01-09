# Let's Cook 🍳

![HTML Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)  
![CSS Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)  
![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)  
![Vercel Badge](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)  
![DummyJSON Badge](https://img.shields.io/badge/API-DummyJSON-blue?style=for-the-badge)

## Description

**Let's Cook** est une application web développée entièrement en **Vanilla JavaScript**. Elle permet aux utilisateurs de rechercher et de filtrer des recettes de cuisine en s'appuyant sur une **API REST** externe, [DummyJSON](https://dummyjson.com/).

### Objectifs pédagogiques

Ce projet a été conçu pour :

- Mettre en pratique la **Programmation Orientée Objet (POO)** avec des classes JavaScript.
- Utiliser des **fonctions asynchrones** pour interagir avec une API REST.
- Apprendre à structurer un projet web avec des **modules JavaScript**.
- Renforcer les compétences en création d'interfaces dynamiques et interactives.

---

## Fonctionnalités principales

1. **Recherche dynamique :**  
   Les utilisateurs peuvent rechercher une recette par son nom en saisissant un mot-clé. Les résultats s'affichent en temps réel avec une fonction asynchrone.

2. **Filtres :**

   - Filtrer les recettes par pays d'origine.
   - Afficher uniquement les recettes ayant une note minimale de 3, 4, 5 étoiles.
   - Trouver des recettes contenant des ingrédients spécifiques.

3. **Affichage détaillé des recettes :**  
   Chaque recette affiche des informations clés : temps de préparation, pays d'origine de la recette, ingrédients et note. Un bouton "En savoir plus" ouvre les détails complets d'une recette.

4. **Architecture :**
   - Le code JavaScript est structuré en deux fichiers principaux :
     - `index.js` : Initialise l'application et gère les interactions utilisateur.
     - `filtres.js` : Contient la classe `FiltreRecettes`, qui encapsule toute la logique des filtres.
     - `api.js` : Contient la classe `Api` pour obtenir les données de l'API avec une fonctione asynchrone.

---

## Architecture du projet

```
.
├── assets
│   ├── css
│   │   ├── style.css
│   └── js
│       ├── index.js
│       └── filtres.js
│       └── api.js
├── index.html
└── README.md
```

### Partionnage des fichiers :

- Le fichier `filtres.js` gère les filtres grâce à la classe `FiltreRecettes`.

  - Avec les paramètres suivant:
    - searchTerm : Mot-clé recherché dans le nom des recettes.
    - cuisineValue : Type de cuisine sélectionné (ex. : "italienne", "japonaise").
    - starValue : Note minimale visible (ex. : 4 étoiles).
    - ingredientTerm : Mot-clé recherché dans les ingrédients.
  - Ensuite filtre les recettes en vérifiant :
    - Si le nom contient le mot-clé de searchTerm.
    - Si le type de cuisine correspond à la sélection (cuisineValue).
    - Si la note est supérieure ou égale à la valeur minimale (starValue).
    - Si un ou plusieurs ingrédients contiennent le mot-clé (ingredientTerm).
  - Et retourne un tabbleau contenatn les recettes filtrées.
  - Et `filtrerEtAfficher` qui donne les recettes filtrées à la fonction `displayRecipes` pour les afficher dynamiquement.

- Le fichier `api.js` contient la classe `Api` pour obtenir les données de l'API.
  - Cette classe utilise une fonction asynchrone `fetchData` pour obtenir les données de l'API au format JSON.
  - Utilise fetch pour effectuer une requête asynchrone.
  - Vérifie si la réponse est valide avec la gestion d'erreurs .
  - Si la réponse est valide, elle est convertie en JSON.
  - Si erreur (réponse non valide ou problème réseau), une exception est levée avec un message d'erreur.
  - Elle effectue une requête http et renvoie les données obtenues.
- Le fichier `index.js` avec l'affichage des données, et les événements utilisateur.
  - Gestion des différent élément interactif de la page.
  - Stockage des données obtenues par l'API dans e `recipesData`.
  - Affichage dynamique des recettes et ajout d'evenements sur les bouton avec `DisplayRecipes` .
  - `OpenDetail` pour ouvrir les details des recettes.
  - `displayData` pour obtenir les données de l'API et les afficher dynamiquement.
  - `displayRecipes` pour afficher les recettes dynamiquement.
  - 'allFilters' pour afficher les filtres dynamiquement.
  - Ajout des écouteurs d'événements.
  - 'displaData' pour lancer l'application.

---

## Ressources utilisées 📚

- **API :** [DummyJSON](https://dummyjson.com/) pour les données des recettes.
- **Vanilla JavaScript :** Le projet utilise uniquement les fonctionnalités natives de JavaScript.
- **CSS :** Styles personnalisés pour une interface utilisateur simple et agréable.
- **Déploiement :** **Vercel** pour un accès rapide et pratique.

---

## Fonctionnement

### Installation

#### Cloner le repository depuis GitHub

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/lets-cook.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd lets-cook
   ```
3. Ouvrez le fichier `index.html` dans votre navigateur ou servez le projet avec un outil local (comme [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

#### Depuis l'adresse Https

1. Accédez à l'adresse suivante :
   ```bash
   https://let-s-cook-gold.vercel.app
   ```

---

## Auteur

- **Nom :** Faber Quentin
- **Formation :** Développement Web et Web Mobile.
- **Objectif :** Apprentissage des concepts de la POO et des bonnes pratiques en développement web.

---

## Améliorations possibles 🚀

1. Ajouter un mode sombre pour une meilleure accessibilité.
2. Permettre aux utilisateurs d'ajouter leurs propres recettes.
3. Intégrer un système de favoris pour enregistrer les recettes préférées.
4. Développer une fonctionnalité de pagination pour afficher plus de résultats.

---
