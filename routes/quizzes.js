/*
 * All routes for QUIZZES are defined here
 * Since this file is loaded in server.js into /quizzes,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();
const quizQueries = require('../db/queries/quizzes');
const questionsQueries = require('../db/queries/questions_multiple_choice');

router.get('/', (req, res) => {
  res.render('quizzes');
});

router.get('/new', (req, res) => {
  res.render('quizzes_new');
});

router.post('/new', (req, res) => {
  let count = Math.round(((Object.keys(req.body).length - 4) /5))
  //console.log(count)
  //console.log(req.body);
  quizQueries.postQuizzes(req.body)
  .then((quizvalue) =>
  questionsQueries.postQuestionsMultipleChoice(quizvalue, count, req.body)
  .then(res.redirect("/api/quizzes"))
  )

}
);

module.exports = router;
