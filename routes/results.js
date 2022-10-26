const express = require('express');
const router = express.Router();
const quizResultsQueries = require('../db/queries/quiz_results');
const questionsQueries = require('../db/queries/questions_multiple_choice');
const quizQueries = require('../db/queries/quizzes');
const questionResultsQueries = require('../db/queries/question_results');


router.get('/:id', (req, res) => {
  let templateVars = {
    thisurl: ("http://localhost:8080/results/"+req.params.id)
  };

  questionResultsQueries.getAnswersForQuizResultsID(req.params.id)
  .then(results =>{
    let increment = 0
    templateVars.answers=[]
    templateVars.correct_answers = 0
    for(let result of results){

      if (result.correct){
        templateVars.answers.push("Correct!")
        templateVars.correct_answers++
      } else {
        templateVars.answers.push("Incorrect!")
      }
      increment++
    }
    templateVars.total_questions = templateVars.answers.length
    return quizQueries.getTitleSubjectByResultsID(req.params.id)
  })
  .then(results=>{
    templateVars.title = results[0].title
    templateVars.subject = results[0].subject
    templateVars.image_url = results[0].image_url
    return quizResultsQueries.getAttemptsAverageScoreFromQuizID(results[0].quiz_id)
  })
  .then(results=>{
    templateVars.global_attempts = results[0].global_attempts
    templateVars.average_score = Math.round(results[0].average_score * 100) / 100
    res.render('results', templateVars);
  })
});


module.exports = router;

//////////////////////////////////
////    POST

// router.post('/'),

// INSERT to DB (make query, quiz_results)

// INSERT for each question in question_results

// score, max_score
