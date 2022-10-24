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

// router.get('/new/:id', (req, res) => {
//   console.log("here")
//   let titlevalue
//   let quiz_id
//   quizQueries.getQuizByID(req.params.id)
//     .then(data => {
//       console.log("1")
//       titlevalue = data[0].title
//       quiz_id = data[0].id;
//       quizQueries.getQuizQuestionCountByID(data[0].id);
//     })
//     .then(data2 => {
//       console.log("2")
//       console.log(data2)
//       const templateQuizVars = {
//         quiz_id,
//         title: titlevalue,
//         email: data2[0],
//       };
//       res.render('quizzes_new_success', templateQuizVars);

//     })
//     .catch(err => {
//       console.log("caught error here")
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });


router.post('/new', (req, res) => {
  let count = Math.round(((Object.keys(req.body).length - 4) / 5));
  //console.log(count)
  //console.log(req.body);
  quizQueries.postQuizzes(req.body)
    .then((quizvalue) =>
      questionsQueries.postQuestionsMultipleChoice(quizvalue, count, req.body)
        .then(res.redirect("/quizzes/new/" + quizvalue))
    );

}
);

module.exports = router;
