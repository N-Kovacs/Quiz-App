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

// const fetchQuestionsHelper = require()


/////////////////////////////////////////////////
////    GET ROUTES
///////////////////////////////////////////////


////    All Quizzes render to Explore Page
////
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
    // console.log(quizzes);
    res.render('quizzes', templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});


////    Create New Quiz Form
////  Will need a template vars at some point
router.get('/new', (req, res) => {
  res.render('quizzes_new');
});


//webpage shown after creating quizzes will need default templatevars data
////    Quiz Form Completed
////
router.get('/new/:id', (req, res) => {
  let quiz;
  quizQueries.getQuizByID(req.params.id)
  .then(data => {
      quiz = data
      return quizQueries.getQuizQuestionCountByID(data.id);
    })
    .then(data2 => {
      const templateVars = {
        title: quiz.title,
        questions_num: data2[0].count,
        custom_url:quiz.url
      };
      res.render('quizzes_new_success', templateVars);

    })
    .catch(err => {
      console.log(err.message);
      res
        .status(500)
        .json({ error: err.message });
    });
});


////    Take Quiz - Get Questions
////
router.get('/:id', (req, res) => {
  console.log("quizzes/:id ROUTE *********")
  // grab req.params.id <---
  const id = req.params.id;
  // fetch the quiz from DB
  quizQueries.getQuizByID(id)
  .then(quiz => {
    // getQuizQuestions(questions);
    // if (!quiz) {
    //   return res.status(404).send("Error! Nothing found.")
    // }
    //Save Current quiz_id as cookie
    //if no cookie, it's first question
    console.log(quiz); // log current quiz_id
    req.session.quiz_id = id;
    res.render('quizzes_attempt', { quiz });
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});


/////////////////////////////////////////////////
////    POST ROUTES
///////////////////////////////////////////////


////    Insert New Quiz to Database
////
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
    })
    //***   I added a catch   ***
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
}
);


module.exports = router;
