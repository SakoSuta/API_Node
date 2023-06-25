const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const router = require('./routes/router');

// Les middlewares nécessaires
app.use(cors());
app.use(express.json());

// Montez les routes
app.use('/api', router);

// Démarrez le serveur
const port = 3000; // Port sur lequel le serveur écoutera les requêtes
app.listen(port, () => {
  console.log(`Serveur Express en cours d'exécution sur le port ${port}`);
});
