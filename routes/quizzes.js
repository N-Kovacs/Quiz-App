/*
 * All routes for QUIZZES are defined here
 * Since this file is loaded in server.js into /quizzes,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
<<<<<<< HEAD
const router = express.Router();
const quizQueries = require('../db/queries/quizzes');
const questionsQueries = require('../db/queries/questions_multiple_choice');
=======
const router  = express.Router();
const quizQueries = require('../db/queries/quizzes');
>>>>>>> master

router.get('/', (req, res) => {
  quizQueries.getQuizzes()
  .then(quizzes => {
    const templateVars = {
      quizzes
      //user_id: req.session.user_name
      // TO DISPLAY NAME
    };

    if (!quizzes) {
      return res.status(404).send("Error! Nothing found.")
    }
    console.log(quizzes);
    res.render('quizzes', templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


//webpage shown for creating new quizzes. Will need a template vars at some point
router.get('/new', (req, res) => {
  res.render('quizzes_new');
});


//webpage shown after creating quizzes
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


//posting data to database
router.post('/new', (req, res) => {
  let count = Math.round(((Object.keys(req.body).length - 4) / 5));
  let temp;
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
