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
├── index.html
└── README.md
```

### Points clés de l'architecture :

1. **Séparation des préoccupations :**

   - Le fichier `filtres.js` gère la logique des filtres grâce à la classe `FiltreRecettes`.
   - Le fichier `index.js` se concentre sur l'initialisation, l'affichage des données, et les événements utilisateur.

2. **Approche POO :**
   - La classe `FiltreRecettes` encapsule toute la logique métier, comme l'application des critères de filtre et l'appel de la fonction d'affichage des recettes.

---

## Ressources utilisées 📚

- **API :** [DummyJSON](https://dummyjson.com/) pour les données des recettes.
- **Vanilla JavaScript :** Le projet utilise uniquement les fonctionnalités natives de JavaScript.
- **CSS :** Styles personnalisés pour une interface utilisateur simple et agréable.
- **Déploiement :** Prévu sur **Vercel** pour un accès rapide et pratique.

---

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

- **Classe `FiltreRecettes` :**  
  La classe centralise la logique de filtrage via deux méthodes principales :

  - `appliquerFiltres` : Applique les critères de recherche et de filtrage pour renvoyer une liste de recettes filtrées.
  - `filtrerEtAfficher` : Combine le filtrage et l'affichage dynamique des résultats.

- **Asynchronous Fetching :**
  - Les recettes sont récupérées depuis l'API avec une fonction asynchrone utilisant `fetch` et `async/await`.
  - La gestion des erreurs assure une expérience fluide, même en cas de problème avec l'API.

---

## Auteur

- **Nom :** Votre Nom
- **Formation :** Développement Web et Web Mobile.
- **Objectif :** Apprentissage des concepts de la POO et des bonnes pratiques en développement web.

---

## Améliorations possibles 🚀

1. Ajouter un mode sombre pour une meilleure accessibilité.
2. Permettre aux utilisateurs d'ajouter leurs propres recettes.
3. Intégrer un système de favoris pour enregistrer les recettes préférées.
4. Développer une fonctionnalité de pagination pour afficher plus de résultats.

---

Ce README est maintenant prêt à être intégré à votre projet. Si vous souhaitez ajouter d'autres informations ou sections, n'hésitez pas ! 😊
