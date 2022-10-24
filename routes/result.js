const express = require('express');
const router = express.Router();
const quizResultsQueries = require('../db/queries/quiz_results');
const questionsQueries = require('../db/queries/questions_multiple_choice');
const quizQueries = require('../db/queries/quizzes');


router.get('/:id', (req, res) => {
  let templateVars = {};

  quizResultsQueries.getCorrectAnswersForQuizResults(req.params.id)
  .then(results =>{
    templateVars.correct_answers = results.correct_answers
    return quizQueries.getQuizQuestionCountByID(req.params.id);
  })
  .then(results=>{
    templateVars.total_questions = results[0].count
  })
  .then(results=>{
    //console.log(templateVars)
    res.render('result', templateVars);
  })


});


module.exports = router;
