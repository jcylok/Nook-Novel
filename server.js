// ---------- SETUP ---------- //
// External Modules
const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
// Internal Modules
const db = require('./models');
const routes = require('./routes');
const app = express();

// ---------- MIDDLEWARE ---------- //
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ---------- CONFIGURATION ---------- //
const PORT = process.env.PORT || 4000;

// Serve Public Directory
app.use(express.static(__dirname + '/public'));

app.use(session({
  secret: 'secret',
  resave: false, // save session on every request
  saveUninitialized: false // Only save a session if session exists on the req object
}))

// ---------- ROUTES ---------- //

// HTML Routes
app.use('/', routes.views);

// API Routes
app.use('/api/v1', routes.api);

// User Routes
app.use('/api/v1/users', routes.users);

// Book Routes
app.use('/api/v1/books', routes.books);

// ---------- START SERVER ---------- //
app.listen(PORT, () => console.log(`SERVER IS A LIVE... @ http://localhost:${PORT}`));