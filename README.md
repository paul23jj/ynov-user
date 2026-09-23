# Forum cuisine

Forum cuisine est un projet en groupe ayant pour objectife de se familiariser avec React.

## Installation

### Prérequis

- Un IDE (VS Code, PyCharm...)

### Commandes exactes

- Récupérer le repository via la commande :
  ```bash
  git clone https://github.com/paul23jj/ynov-user.git
  ```

- Installer les dépendances npm :
  ```bash
  npm install
  npm run dev
  ```

## Dépendances

Nous utilisons une API sur la cuisine.

Voici la documentation de l'API en question :
https://dummyjson.com/docs

## Usage

Pour lancer le projet, il suffit d'effectuer la commande suivante à la racine du projet :

```bash
npm run dev
```

## Visuel

<p align="center">
  <img src="acceuil.png" alt="Page d'accueil Art Gallery" width="100%">
</p>

<p align="center">
  <img src="connexion.png" alt="Page artistes Art Gallery" width="100%">
</p>

## Architecture

```text
ynov-user/
├── public/              # Fichiers statiques
│   ├── favicon.svg
│   └── icons.svg
│
├── src/                 # Code source de l'application
│   ├── assets/          # Images et ressources
│   ├── data/            # Données locales
│   ├── pages/           # Pages de l'application
│   ├── routes/          # Gestion des routes et routes protégées
│   ├── store/           # Gestion de l'état global avec Redux
│   │   ├── reducer/     # Reducers Redux
│   │   └── store.ts     # Configuration du store Redux
│   │
│   ├── type/            # Interfaces et types TypeScript
│   ├── App.css          # Styles du composant principal
│   ├── App.tsx          # Composant principal
│   ├── index.css        # Styles globaux
│   ├── main.tsx         # Point d'entrée React
│   └── route.tsx        # Déclaration des routes
│
├── .gitignore
├── oxlint.json
├── index.html
├── package-lock.json
├── package.json
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Support

*Le projet n'est pas supporté.*

## Licence

Projet pédagogique, non destiné à la diffusion
