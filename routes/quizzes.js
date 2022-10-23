/*
 * All routes for QUIZZES are defined here
 * Since this file is loaded in server.js into /quizzes,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const quizQueries = require('../db/queries/quizzes');

router.get('/', (req, res) => {
  res.render('quizzes');
});

router.get('/new', (req, res) => {
  res.render('quizzes_new');
});

router.post('/new', (req, res) => {
  console.log(req.body)
  quizQueries.postQuizzes(req.body)
  .then(console.log("done"))
}
)

module.exports = router;
