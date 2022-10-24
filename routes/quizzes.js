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

router.get('/new/:id', (req, res) => {
  let dataStore;
  quizQueries.getQuizByID(req.params.id)
    .then(data => {
      dataStore = data;
      return quizQueries.getQuizQuestionCountByID(data[0].id);
    })
    .then(data2 => {
      const templateQuizVars = {
        title: dataStore[0].title,
        questions_num: data2[0].count,
        custom_url:dataStore[0].url
      };
      res.render('quizzes_new_success', templateQuizVars);

    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


router.post('/new', (req, res) => {
  let count = Math.round(((Object.keys(req.body).length - 4) / 5));
  let temp;
  //console.log(count)
  //console.log(req.body);
  quizQueries.postQuizzes(req.body)
    .then((quizvalue) => {
      temp = quizvalue;
      return questionsQueries.postQuestionsMultipleChoice(quizvalue, count, req.body);
    })
    .then(() => {
      res.redirect("/quizzes/new/" + temp);
    });

}
);

module.exports = router;
