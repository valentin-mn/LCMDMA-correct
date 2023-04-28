# Activité 1 : Social login

> L’objectif de cette activité était d’implémenter un social login via google et un autre réseau de notre choix afin de pouvoir se connecter au site via ces réseaux. Nous avons donc choisi github. Cette tâche à été partiellement réalisée.

### Login Github 

> Lorsque l’utilisateur se connecte avec Github, la méthode signin() est appelée et va initialiser la bibliothèque OAuth avec une clé d’authentification pour l’API de Github.

> Ensuite une fenêtre pop-up apparaîtra pour que l’utilisateur se connecte et un message apparaîtra pour confirmer la connexion.

> Les informations de connexion sont ensuite envoyées dans le store pour créer un compte utilisateur.

> Un nouvel utilisateur a bien été créé avec les informations du compte Github.







### Login Google

> Le login Google est implémenté mais pas fonctionnel. Pour celui-ci j'utilise passeport et OAuth2. 


> Tout d’abord il a fallu créer le projet sur l’API google cloud et générer un user avec des identifiants et un code secret.

> Ainsi que l’url vers lequel sera redirigé l’utilisateur après la connexion (callback url).

> La fonction de rappel de la stratégie est définie avec les paramètres accessToken, refreshToken, profile et done. Cette fonction de rappel est appelée lorsque l'utilisateur est authentifié avec succès avec Google. Elle prend les informations d'identification de l'utilisateur, les traite et les transmet à la fonction done().

serializeUser() et deserializeUser() sont utilisées pour stocker et récupérer des informations d'utilisateur dans une session.


> Enfin, deux routes sont définies pour la gestion de l'authentification avec Google. La première route est /auth/google, qui est utilisée pour initier l'authentification avec Google en utilisant la méthode authenticate() de passport. La deuxième route est /auth/google/callback, qui est l'URL de rappel pour l'authentification réussie avec Google. La fonction de rappel pour cette route est définie pour rediriger l'utilisateur vers l'URL spécifiée en cas d'authentification réussie.




# Activité 2 : Implémenter des websocket dans l’application :
> Nicolas Meister


Dans le cadre de notre application, nous avons décidé d’implémenter un chat afin d’utiliser les websockets.
Cette mission, que nous avons acceptée, à été entièrement couronnée de succès.

Avec l’aide de Socket.IO, j’ai créé un système d’écoute du côté back-end. Ensuite, j’ai connecté le front-end à ce système d’écoute, afin que le système de chat soit bien intégré dans l’app.
Les fichiers impactés sont tous ceux modifiés dans le commit #256a2b9c408a98369bc86b8a388bd71b54a00294 sur discord.

> Afin de tester le chat, veuillez vous connecter sur le site, puis ouvrir un deuxième onglet dans lequel vous vous connectez aussi. Ensuite un bouton chat apparaît en bas à droite, vous pouvez le tester !


# Activité 3 : Ajouter 8 mesures de sécurité / protection
> Valentin Munch
 
### Vulnérabilité 1 : Éviter les injections SQL grâce à Sequelize
Injections SQL
Utilisation de Sequelize
Variables mises en paramètres,
Évite donc les injections SQL
Par exemple, pour sélectionner tous les achats par id 
> Sans SEQUELIZE
Requête : 
```SELECT * FROM Achat WHERE id = idRecherche;```
 
Définition de la table Achat
```
CREATE TABLE Achat
(
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    tarifId INT,
    dateAchat DATE,
    qrCode STRING,
    quantite INT
)
```


Avec SEQUELIZE
Requête - Dans achat.service.js (https://github.com/valentin-mn/LCMDMA-correct/tree/vulnerabilites/backend/src/services)

Définition de la table Achat - Dans achat.model.js (https://github.com/valentin-mn/LCMDMA-correct/tree/vulnerabilites/backend/src/models)
 
 
### Vulnérabilité 2 : Résolution automatique des vulnérabilités Node

Vulnérabilité des dépendances connues avec Express si la version utilisée est trop ancienne
Faire les commandes, dans le répertoire “backend” : 

```npm audit```

 Les vulnérabilités observées sont les suivantes :

Ici, une vulnérabilité était avec Axios, qui était « vulnérable à la falsification de requête côté serveur » ainsi que « complexité inefficace des expressions régulières »
Pour régler les vulnérabilités, nous pouvons mettre à jour notre version d’ExpressJS ou tout simplement grâce à la commande
 npm audit fix
Si l’on refait npm audit , on voit que les vulnérabilités détectées précédemment, pouvant être automatiquement résolues,  ont disparu
 
### Vulnérabilité 3 : Renforcement des en-têtes HTTP

Utilisation du module Helmet
installé grâce à npm install helmet
Dans (https://github.com/valentin-mn/LCMDMA-correct/blob/vulnerabilites/backend/index.js) : 
Import du module dans le projet : 

Appel lors de la création de l’application : 

 Avec HELMET : 

⇒ Ici, ce sont les paramètres par défaut d’Helmet qui ont été mis en place. En somme, ce module permet d’améliorer notre application Express en ajoutant des en-têtes HTTP pour bloquer les vulnérabilités courantes.
⇒ Les en-têtes ajoutés permettent notamment de : 
Contrôler la prélecture DNS
Aide à atténuer les attaques par scripts intersites en permettant la définition d'une politique qui peut contrôler les ressources que l'agent utilisateur est autorisé à charger
Indique aux navigateurs de n'autoriser l'accès au site Web qu'à l'aide de HTTPS
Désactive l'option d'ouverture d'un fichier directement lors du téléchargement
Contrôle la quantité d'informations de référence incluses dans les requêtes
⇒ On peut également désactiver certains middleware ou mettre des options personnalisées pour notre header.

### Vulnérabilité 4 : Limiter le nombre de requêtes par IP

Afin de ne pas surcharger le serveur ou éviter les adresses DDOS, nous pouvons mettre en place un limiteur de requêtes
Dans index.js :	 (https://github.com/valentin-mn/LCMDMA-correct/blob/vulnerabilites/backend/index.js) 
Grâce au module “express-rate-limit”
npm install express-rate-limit
On importe ensuite le module :

On déclare la fonction comme suit, la limite sera définie à 100 requêtes/IP/jour

Puis on l’appelle dans la création de l’application



### Vulnérabilité 5 : Mise en place d’une sécurité au login / éviter la connexion par brute force 

Mettre un nombre limite de login toutes les 15 minutes - dans auth.router.js (https://github.com/valentin-mn/LCMDMA-correct/blob/vulnerabilites/backend/src/routers/auth.router.js) : 
Importer express-rate-limit (normalement déjà importée lors de la partie précédente)
Créer la méthode loginLimiter qui permet d’avoir 5 chances d’entrer correctement son mot de passe, toutes les 15 minutes


Sans la mise en place de cette limitation, message “Login incorrect” : 

Avec la mise en place de cette limitation : 
→ Bouton “Fermer”, les requêtes ne sont plus prises en compte par le serveur.
Mise en place d’un temps de délai pour traiter une requête de login - dans auth.js (https://github.com/valentin-mn/LCMDMA-correct/blob/vulnerabilites/backend/utils/auth.js) 


Fonction qui va générer aléatoirement un temps entre 1 et 5 secondes pour traiter une requête de login
Utilisation de la méthode NodeJS setImmediate. Il est important de noter que l'utilisation de setImmediate plutôt que setTimeout permet de ne pas bloquer le thread principal de Node.js pendant l'attente, ce qui peut aider à améliorer les performances de l'application. Cependant, l'ajout de temps d'attente aléatoire ne doit pas être considéré comme une mesure de sécurité totale et il est important de mettre en place d'autres mesures de sécurité pour protéger votre application.

randomDelay va donc générer un chiffre entre 1000ms et 5000ms qui va être passé 

## Vulnérabilité 6 : Cryptage des données de connexion / d’inscription - auth.controller.js

Sans l’utilisation du protocole HTTPS, les données récupérées lors des requêtes ne sont pas cryptées, il faut donc les crypter !
On va donc utiliser le module “bcrypt” afin de s’en occuper : 
npm i bcrypt
Une fois installé, nous allons donc l’importer dans notre “auth.controller.js” (https://github.com/valentin-mn/LCMDMA-correct/blob/vulnerabilites/backend/src/controllers/auth.controller.js)
Pour le login, on va comparer le mot de passe entré et le mot de passe hashé dans la base de données : 

Pour l’inscription, on va hasher le mot de passe puis créer un utilisateur dans la base de données avec le mot de passe hashé : 


### Vulnérabilité 7 : NPM et Node pas à jour 

Dans notre projet, lorsque l’on fait un npm audit, on se rend compte que la version de npm présente sur notre projet n’est pas à jour

Avoir un module non à jour peut présenter un risque sur la sécurité du projet, surtout car des vulnérabilités peuvent être présentes sur des versions antérieurs
Les hackers peuvent donc avoir connaissance de ces vulnérabilités et avoir accès à nos données ou installer des modules malveillants.
Pour résoudre cela, c’est assez simple. Il suffit de lancer comme demandé la commande : npm install -g npm 
La version installée sera donc la dernière version stable
Attention, il faudra également télécharger la dernière version de Node ! Lorsque l’on installe la dernière version de Node, la dernière version stable de npm sera également installée :
sudo npm cache clean -f
sudo npm install -g n
sudo n stable
⇒ Cela va télécharger la dernière version stable de Node


### Vulnérabilité 8 :  Création d’un token JWT personnalisé - token.controller.js

Avec un token, on peut authentifier simplement de manière sécurisée les utilisateurs. Une fois émis par le serveur, ils permettent de valider la demande d’un utilisateur sans avoir besoin de stocker l’état de l’utilisateur sur le serveur, sachant que ce jeton est portable.
On va tout d’abord créer un modèle “Token” - dans token.model.js (https://github.com/valentin-mn/LCMDMA-correct/blob/vulnerabilites/backend/src/models/token.model.js) 

Ensuite, on crée le controller. En utilisant Math.random().toString(36).substr(2) deux fois et en concaténant les deux résultats avec le signe "+" dans le milieu, le code crée un token de 24 caractères qui est à la fois unique et difficile à deviner. Chaque token est identifié également par l’adresse IP de l’utilisateur.

On peut également créer une méthode qui vérifie le token, grâce à son identifiant de 24 caractères, et à l’adresse IP qui lui a été associée.

Finalement, on peut retrouver un utilisateur grâce à son token : 




# Activité 4 : Implémenter un mécanisme de Response-Caching
> Raphaël Fridelance
 

L’objectif est donc d’implémenter un mécanisme de Response-Caching dans le serveur de l’application LCMDMA, donc dans le backend, pour améliorer les performances et répondre plus rapidement aux clients. Cette tâche a été entièrement réalisée sur les requêtes aux serveurs de l’application LCMDMA (projet GitHub : https://github.com/valentin-mn/LCMDMA-correct).
Utilisation du package “node-cache” pour le cache
https://github.com/valentin-mn/LCMDMA-correct/blob/main/backend/utils/cache.js
const NodeCache = require('node-cache');
const cache = new NodeCache();
 

Création du module de cache à partir de  celui présent dans le cours. Le fichier se trouve dans le dossier ”utils” du backend.

```
module.exports = duration => (req, res, next) => {
   if (req.method !== 'GET') {
       console.log('Le cache ne peut être utilisé que pour les requêtes GET');
       next();
   }
   const key = req.originalUrl;
   const cachedBody = cache.get(key);


   if (cachedBody) {
       console.log('Cache utilisé pour  ' + key);
       res.send(cachedBody);
   } else {
       console.log('Cache non utilisé pour  ' + key);
       res.sendResponse = res.send;
       res.send = body => {
           res.sendResponse(body);
           cache.set(key, body, duration);
       };
       next();
   }
}
```
 	Ce middleware permet tout d’abord de regarder si la requête est bien une requête “GET”, car le response-caching ne peut s’effectuer uniquement sur celle-ci. Ensuite, si c’est bien une requête admissible, on attribue l’URL demandée à une clé pour après prendre les informations dans le cache de cette URL. S’il y a bien quelque chose dans ce cache, on renvoie à l’utilisateur les informations présentes et on ne va pas plus loin, donc on ne fait pas d'interaction supplémentaire. Sinon, on fait la requête comme s’il n’y avait pas cette méthode, pour ensuite mettre les informations reçues de cette requête dans le cache pour que les prochaines requêtes similaires. Cela se fait la ligne “cache.set” dans laquelle on insère la clé, donc l’URL en question, les informations demandées et une durée de disponibilité de ce cache en seconde.

Il faut ensuite appliquer ce middleware à toutes les routes du serveur, donc on ajoute son utilisation dans le fichier du serveur, ici ”index.js”, avec la durée voulue, ici cinq minutes.

https://github.com/valentin-mn/LCMDMA-correct/blob/main/backend/index.js


```app.use(cache(300));```

Avec ça, lorsqu’un utilisateur fera une requête “GET” au serveur, celle-ci sera enregistrée dans le cache pendant cinq minutes, pendant lesquelles, si on refait cette même requête, on aura ces données plus rapidement et avec moins d’intéractions.

On voit ici la différence sur les requêtes suivantes

Ici sur la requête n’utilisant pas le cache
Et sur celle-ci l’utilisant

On passe 66 millisecondes à 4 millisecondes sur des requêtes renvoyant un nombre minuscule d’informations, donc sur des requêtes qui en renvoient énormément, cela fait une grosse différence.

On peut également observer son fonctionnement dans la console du serveur



Le cache n’est pas utilisé sur la première requête pour recevoir les activités, donc le serveur interagit avec la base données, mais il est utilisé les deux fois d’après, où on voit qu’il n’y a aucune interaction avec la base données.


### Activité 5 : Traitement de grande quantité de données avec Node.JS

> Thomas Becher


Afin de traiter des grandes quantités de données, nous avons scrappé le site Alumni, afin de récupérer une grande quantité d’utilisateurs.
A partir de cette grande quantité de données j’ai rempli la base de données, puis nodeJS fait le travail nécessaire à l’exploitation de ces données.
Concernant le scrapping, alumni possédait une api ouverte, à laquelle nous avons simplement fait des requêtes 
