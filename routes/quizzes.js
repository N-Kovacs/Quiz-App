/*
 * All routes for QUIZZES are defined here
 * Since this file is loaded in server.js into /quizzes,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router = express.Router();

const quizQueries = require('../db/queries/quizzes');
// const userQueries = require('../db/queries/users');
const questionsQueries = require('../db/queries/questions_multiple_choice');


/////////////////////////////////////////////////
////    GET ROUTES
///////////////////////////////////////////////


////    All Quizzes render to Explore Page
////
router.get('/', (req, res) => {
  quizQueries.getQuizTopics()
    .then(quizzes => {
      console.log(quizzes)
      const user_id = req.session.user_id;

      console.log("* * * GET quizzes/", req.session.user_id);
      const templateVars = {
        quizzes, user_id, onuserpage: false
      };

      if (!quizzes) {
        return res.status(404).send("Not Found");
      }
      res.render('quizzes', templateVars);
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
  const user_id = req.session.user_id;
  res.render('quizzes_new', { user_id, onuserpage: false });
});

router.get('/new/failed', (req, res) => {
  templateVars = { reason: req.query.reason }
  res.render('quizzes_new_failed', templateVars);
});


//webpage shown after creating quizzes will need default templatevars data
////    Quiz Form Completed
////
router.get('/new/:id', (req, res) => {
  let quiz;
  quizQueries.getQuizByID(req.params.id)
    .then(data => {
      quiz = data;
      return quizQueries.getQuizQuestionCountByID(data.id);
    })
    .then(data2 => {
      const user_id = req.session.user_id;
      const templateVars = {
        user_id,
        title: quiz.title,
        questions_num: data2[0].count,
        custom_url: quiz.url,
        quiz_id: quiz.id
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
  const quiz_url = req.params.id;

  // fetch the quiz from DB
  quizQueries.getQuizByURL(quiz_url)
    .then(quiz => {
      if (!quiz) {
        return res.status(404).send("Not Found");
      }
      //Save Current quiz_id as cookie
      //if no cookie, it's first question
      console.log("* * * GET quizzes/id", quiz); // log current quiz_id
      req.session.quiz_id = quiz.id; // ** CHANGE THIS.. will OVERRIDE **
      res.render('quizzes_attempt', { quiz });
    })
    .catch(err => {
      console.log("GET quizzes/:id", err.message);
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
  let reqBody = req.body
  let temp;
  console.log("* * * POST quizzes/new", req.body);

  quizQueries.getQuizByURL(req.body.custom_url)
  .then((result) => {
    if (!result) {
      quizQueries.postQuizzes(req.body)
      .then((quizvalue) => {
        temp = quizvalue;
        return questionsQueries.postQuestionsMultipleChoice(quizvalue, count, req.body);
      })
      .then(() => {
        res.redirect("/quizzes/new/" + temp);
      })
      .catch(err => {
        console.log("INSIDE POST quizzes/new", err.message);
        res
          .status(500)
          .json({ error: err.message });
      });
    } else {
      res.redirect("/quizzes/new/failed?reason=usedurl")
    }
  });
 });


module.exports = router;
