<h1>Groupomania / Openclassrooms / Projet 7</h1>  
Création d'un réseau social d'entreprise  </br>
 </br>
<i>Télécharger le repository et suivez les instructions ci-après pour installer ce projet en local</i> </br>

<h2>Prérequis</h2> </br>
<strong>
Installer Node.js </br>
Installer React </br>
Installer MySQL </br>
Base de données MySQL </br>
</strong>

 </br>

<strong>Ouvrez un terminal</strong> </br>
Connectez-vous à MySQL : `mysql -u root -p` </br>
Tapez votre mot de passe : `******` </br>

<strong>Utiliser la base de données exemple:</strong></br>
Créez la base de données : `CREATE DATABASE groupomaniadb_dev;` </br>
Utilisez la base de données créée : `USE groupomaniadb_dev;` </br>
Importez les tables groupomaniadb_dev_TABLES.sql : `SOURCE groupomaniadb_dev.sql;` </br>

<strong>Créer et Utiliser votre base de donnée:</strong></br>
Créez la base de données : `CREATE DATABASE votreBDD;` </br>
Utilisez la base de données créée : `USE votreBDD;` </br>
Changer le fichier config.json (backend/config/config.json) avec vos innformations:</br>
`"development": {
    "username": "votre username BDD",
    "password": "votre password BDD",
    "database": "votreBDD",
    "host": "127.0.0.1",
    "dialect": "mysql",
    "port": "votre port de BDD"
  },`</br>

<h2>Installation et démarrage du Backend</h2> </br>
<strong>Ouvrez un terminal</strong> </br>

Allez dans le dossier backend : `cd backend` </br>
Installez toutes les dépendances back du projet : `npm install` </br>
Si vous utiliser votre propre BDD faire une migration avec la commande : `sequelize db:migrate`</br>
Aller dans le fichier .env (backend/config/.env) pour changer les ports back et front si besoin</br>
Démarrez le serveur Node.js : `nodemon server` </br>

<h2>Installation et démarrage du Frontend</h2> </br>
<strong>Ouvrez un terminal</strong> </br>

Allez dans le dossier frontend : `cd frontend` </br>
Allez dans le dossier client : `cd client` </br>
Installez toutes les dépendances du projet : `npm install` </br>
Aller dans le fichier .env (frontend/client/.env) pour modifier l'URL front si vous avez changé le port en back</br>
Démarrez l'application : `npm start` </br>

<!-- <strong>Admininistration Login</strong> </br>
```LOGIN: admin```
```PASSWORD: Admin123!``` -->

<strong>Testez l'application</strong> </br>
Ouvrez votre navigateur et allez sur : `http://127.0.0.1:3000/`
