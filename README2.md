# Let's Cook 🍳

![HTML Badge](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS Badge](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript Badge](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Vercel Badge](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![DummyJSON Badge](https://img.shields.io/badge/API-DummyJSON-blue?style=for-the-badge)

## Description

**Let's Cook** est une application web développée entièrement en **Vanilla JavaScript** (sans frameworks). Elle permet aux utilisateurs de rechercher et d'explorer des recettes de cuisine en s'appuyant sur une **API REST** externe, [DummyJSON](https://dummyjson.com/).

### Objectifs pédagogiques

Ce projet a été conçu pour :

- Mettre en pratique la **Programmation Orientée Objet (POO)**.
- Utiliser des **fonctions asynchrones** pour interagir avec une API REST.
- Structurer un projet web avec des bonnes pratiques : **HTML sémantique**, **CSS modularisé**, et **JavaScript en modules**.
- Préparer le déploiement d'une application web sur **Vercel**.

## Fonctionnalités principales

1. **Recherche de recettes :**
   - Saisissez un mot-clé pour rechercher des recettes correspondantes.
   - Les résultats sont mis à jour dynamiquement grâce à une requête asynchrone.
2. **Filtres avancés :**

   - Trier les recettes par nom (croissant/décroissant) ou par date (croissant/décroissant).
   - Ajuster le nombre de recettes affichées par page (4, 8, 12, etc.).

3. **Pagination dynamique :**

   - Naviguez entre les pages grâce aux boutons "Précédent" et "Suivant", qui adaptent le **skip** en fonction du nombre de recettes affichées.

4. **Responsive Design :**
   - L'application est optimisée pour les mobiles, tablettes, et desktops.

## Architecture du projet

```
.
├── assets
│   ├── css
│   │   ├── custom.css
│   │   ├── reboot.css
│   │   ├── style.css
│   │   ├── utilities.css
│   │   └── variables.css
│   ├── images
│   │   └── logo.svg
│   └── js
│       ├── index.js
│       └── Recipe.js
├── index.html
├── README.md
└── recette.html
```

### Points clés de l'architecture :

1. **Séparation des préoccupations :**
   - **CSS** : Modularisé avec des fichiers dédiés pour les variables, styles généraux, et utilitaires.
   - **JavaScript** : Code structuré avec des modules (fichier principal et classe `Recipe`).
2. **Approche POO :**
   - La classe `Recipe` encapsule toute la logique métier liée aux recettes (fetch, affichage, gestion des événements).

## Ressources utilisées 📚

- **API :** [DummyJSON](https://dummyjson.com/) pour les données des recettes.
- **Vanilla JavaScript :** Aucune bibliothèque ou framework.
- **CSS :** Reboot et styles personnalisés.
- **Déploiement :** [Vercel](https://vercel.com/) (URL fictive : [https://lets-cook.vercel.app](https://lets-cook.vercel.app)).

## Fonctionnement

### Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/votre-utilisateur/lets-cook.git
   ```
2. Accédez au répertoire du projet :
   ```bash
   cd lets-cook
   ```
3. Ouvrez le fichier `index.html` dans votre navigateur ou servez le projet avec un outil local (comme [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)).

### Explications techniques

- **Fonctions asynchrones :**
  - Les méthodes `fetchData` et `displayData` utilisent `async/await` pour récupérer et afficher les données.
  - La gestion des erreurs garantit une expérience utilisateur fluide.
- **API REST :**
  - Les requêtes sont construites dynamiquement à partir des paramètres sélectionnés (mot-clé, filtres, pagination).
  - Exemple d'URL générée : `https://dummyjson.com/recipes?limit=12&skip=24`.
- **Pagination :**
  - Les boutons "Précédent" et "Suivant" ajustent la valeur de `skip` en fonction du nombre d'éléments à afficher (`limit`).

### Déploiement

- Le projet sera déployé sur **Vercel**. Accédez à l'application ici : [Let's Cook](https://lets-cook.vercel.app).

## Auteur

- **Nom :** Nicolas Malet
- **Formation :** Développement Web et Web Mobile.
- **Objectif :** Validation des compétences en création et déploiement d'applications web.

## Améliorations possibles 🚀

1. Ajouter une base de données pour stocker les recettes.
2. Intégrer un système d'authentification pour les utilisateurs.
3. Migrer vers un framework comme **React** pour une gestion plus avancée des états.
4. Ajouter des tests automatisés avec **Jest** ou **Cypress**.
