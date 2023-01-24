const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'config.env' });
const dbConnection = require('./db/connection');

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(require('./routes/router'));

dbConnection
  .then((db) => {
    if (!db) return process.exit(1);

    // Only listen to the HTTP server if the db connection is established
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    app.on('error', (err) => console.log(`Failed to Connect with HTTP Server: ${err}`));
  })
  .catch((err) => console.log(`Failed to Connect to Database: ${err}`));
