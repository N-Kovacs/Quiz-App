const express = require('express');
const router = express.Router();
const quizResultsQueries = require('../db/queries/quiz_results');

const quizQueries = require('../db/queries/quizzes');
const questionResultsQueries = require('../db/queries/question_results');



router.get('/:id', (req, res) => {
  let templateVars = {
    thisurl: ("http://localhost:8080/results/" + req.params.id)
  };
  // console.log("* * * GET /results/:id", req.params.id);
  questionResultsQueries.getAnswersForQuizResultsID(req.params.id)
    .then(results => {
      let increment = 0;
      templateVars.answers = [];
      templateVars.correct_answers = 0;

      for (let result of results) {

        if (result.correct) {
          templateVars.answers.push("Correct!");
          templateVars.correct_answers++;
        } else {
          templateVars.answers.push("Incorrect!");
        }
        increment++;
      }
      templateVars.total_questions = templateVars.answers.length;
      return quizQueries.getTitleSubjectByResultsID(req.params.id);
    })
    .then(results => {
      templateVars.title = results[0].title;
      templateVars.subject = results[0].subject;
      templateVars.image_url = results[0].image_url;
      // console.log("* * * GET /results/:id", templateVars.image_url);
      return quizResultsQueries.getAttemptsAverageScoreFromQuizID(results[0].quiz_id);
    })
    .then(results => {
      templateVars.global_attempts = results[0].global_attempts;
      templateVars.average_score = Math.round(results[0].average_score * 100) / 100;
      res.render('results', templateVars);
    })
    .catch(err => {
      console.log("INSIDE GET /results/:id", err.message);
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;


/////////////////////////////////////////////////
////    POST ROUTES
///////////////////////////////////////////////

router.post('/', (req, res) => {


  let temp = "";
  let counter = 0;
  const qResults = req.body.data.question_results;
  for (const c of qResults) {
    if (c.correct === "true") {
      counter++;
    }
  }
  const passIn = {
    quiz_id: req.body.data.quiz_results[0].quiz_id,
    //dummy user_id
    user_id: 1, //GET USER COOKIE
    max_score: qResults.length,
    score: counter
  };

  quizResultsQueries.postQuizResults(passIn)
    .then((resultsID) => {
      temp = resultsID;
      console.log("RESID >>>", resultsID)
      return questionResultsQueries.postQuestionResultsbyID(
        qResults, 1, resultsID
      ); // <<< 1 = usercookie
    })
    .then(() => {
      console.log("* * * * * POST /results/", temp);
      res.send("/results/" + temp);
    })
    .catch(err => {
      console.log("INSIDE POST /results/", err.message);
      res
        .status(500)
        .json({ error: err.message });
    });
});
