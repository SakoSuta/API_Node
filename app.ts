const express = require('express');
const app = express();
const routes = require('./router/router');

// les middlewares nécessaires
app.use(express.json());

// Montez les routes
app.use('/', routes);

// Démarrez le serveur
const port = 3000; // Port sur lequel le serveur écoutera les requêtes
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
