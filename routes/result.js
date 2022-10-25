const express = require('express');
const router = express.Router();
const quizResultsQueries = require('../db/queries/quiz_results');
const questionsQueries = require('../db/queries/questions_multiple_choice');
const quizQueries = require('../db/queries/quizzes');
const questionResultsQueries = require('../db/queries/question_results');


router.get('/:id', (req, res) => {
  let templateVars = {};

  questionResultsQueries.getAnswersForQuizResultsID(req.params.id)
  .then(results =>{
    console.log(results)
    let increment = 0
    templateVars.answers=[]
    templateVars.correct_answers = 0
    for(let result of results){
      templateVars.answers.push(result.correct)
      increment++
      if (result.correct){
        templateVars.correct_answers++
      }
    }
    templateVars.total_questions = templateVars.answers.length
    console.log(templateVars)
    return quizQueries.getTitleSubjectByResultsID(req.params.id)
  })
  .then(results=>{
    console.log("newest:")
    console.log(results)
    templateVars.title = results[0].title
    templateVars.subject = results[0].subject
    templateVars.image_url = results[0].image_url
  })
  .then(results=>{
    //console.log(templateVars)
    res.render('result', templateVars);
  })


});


module.exports = router;
