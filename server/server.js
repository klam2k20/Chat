const express = require('express');
const cors = require('cors');
require('dotenv').config({ path: 'config.env' });

const app = express();

const PORT = process.env.PORT || 8080;

// Middleware
app.use(cors());
app.use(require('./routes/router'));

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
