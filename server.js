// load .env data into process.env
require('dotenv').config();

// Web server config
const sassMiddleware = require('./lib/sass-middleware');
const express = require('express');
const morgan = require('morgan');
const cookieSession = require('cookie-session');

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cookieSession({
  name: 'session',
  keys: ['key1']
}));

app.set('view engine', 'ejs');
// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(
  '/styles',
  sassMiddleware({
    source: __dirname + '/styles',
    destination: __dirname + '/public/styles',
    isSass: false, // false => scss, true => sass
  })
);
app.use(express.static('public'));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const userApiRoutes = require('./routes/users-api');
const quizApiRoutes = require('./routes/quizzes-api');
const usersRoutes = require('./routes/users');
const quizzesRoutes = require('./routes/quizzes')
const loginRoutes = require('./routes/login')
const resultRoutes = require('./routes/result')
const questionsApiRoutes = require('./routes/questions-api')

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
// Note: Endpoints that return data (eg. JSON) usually start with `/api`
app.use('/api/users', userApiRoutes);
app.use('/api/quizzes', quizApiRoutes);

app.use('/api/questions', questionsApiRoutes);
app.use('/users', usersRoutes);
app.use('/user/:id', usersRoutes);
app.use('/quizzes', quizzesRoutes);
app.use('/login', loginRoutes);
app.use('/result', resultRoutes);

// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`QUIZ APP listening on port ${PORT}`);
});
