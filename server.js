// ---------- SETUP ---------- //
// External Modules
const express = require('express');
const bodyParser = require('body-parser');
// Internal Modules
const db = require('./models');
const routes = require('./routes');
const app = express();

// ---------- MIDDLEWARE ---------- //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ---------- CONFIGURATION ---------- //
const PORT = process.env.PORT || 4000;

// ---------- ROUTES ---------- //

// User Routes
app.use('/api/v1/users', routes.users);

// Trainer Routes
app.use('/api/v1/books', routes.books);

// ---------- START SERVER ---------- //
app.listen(PORT, () => console.log(`SERVER IS A LIVE... @ http://localhost:${PORT}`));