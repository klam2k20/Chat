const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'config.env' });
const { notFound404 } = require('./middleware/middleware');
const dbConnection = require('./db/connection');

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(express.json());
// Mounts the middleware at path /api/user, then router sets the subpath
app.use('/api/user', require('./routes/userRouter'));
app.use('/api/chat', require('./routes/chatRouter'));
app.use('/api/message', require('./routes/messageRouter'));

app.use(notFound404);

dbConnection
  .then((db) => {
    if (!db) return process.exit(1);

    // Only listen to the HTTP server if the db connection is established
    app.listen(PORT, () => console.log(`Listening on ${PORT}`));
    app.on('error', (err) => console.log(`Failed to Connect with HTTP Server: ${err}`));
  })
  .catch((err) => console.log(`Failed to Connect to Database: ${err}`));
