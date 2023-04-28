# LCMDMA
La Cour Médiavale De Monseigneur Ambert

Bienvenue à tous dans notre projet !

Ici, nous créerons l'application *OFFICIELLE* du regroupement médievial a renommée mondiale : La Cour De Monseigneur Ambert.


### Les fichiers sont organisés dans trois dossiers différents :
- Backend : contient les fichiers de l'API
- Frontend : contient les fichiers vue du site web
- bdd_files : contient les fichiers de la base de données (et les scénarios d'utilisation)

#### Backend
L'API peut être lancée avec la commande `npm run start` dans le dossier backend. Elle est accessible sur le port 3000.  
La documentation Swagger est disponible à l'adresse suivante : http://localhost:3000/api-docs/  
Les routes sont accessibles aux adresses suivantes : http://localhost:3000/api/...
Il est aussi possible de changer le comportment de la base de données au lancement de l'API, si on veut recréer les tables (`force`) ou modifier les données présentes(`alter`) dans celles-ci en modifiant le booléen dans le fichier /utils/importDB.js

#### Frontend
Le site web peut être lancé avec la commande `npm run serve` dans le dossier frontend. Il est accessible sur le port 8080.  
Les maquettes Figma sont disponibles à l'adresse suivante : https://www.figma.com/file/2a2azO5UDzzEpNyev00arY/Convention-m%C3%A9di%C3%A9vale?node-id=0%3A1

#### bdd_files
On y retrouve le MCD de la base de données sous forme de fichier Looping et PNG.
On y retrouve aussi le script de création des tables (qui sont crées aussi lors du lancemement de l'API avec Sequelize) et un jeu de données pour tester l'API.



### Pour le projet de Services Web

> Lien du Readme : [lien readme](https://github.com/valentin-mn/LCMDMA-correct/blob/vulnerabilites/README_Projet_Services_Web.md) 
