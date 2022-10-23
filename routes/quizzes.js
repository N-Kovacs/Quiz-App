/*
 * All routes for QUIZZES are defined here
 * Since this file is loaded in server.js into /quizzes,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();
const quizQueries = require('../db/queries/quizzes');

router.get('/', (req, res) => {
  quizQueries.getQuizzes()
  .then(quizzes => {
    // const quiz_id = quizzes[0].id;
    const templateVars = {
         quizzes,
      // quiz_id,
      // owner_id: quizzes[0].owner_id,
      // public: quizzes[0].public,
      // title: quizzes[0].title,
      // subject: quizzes[0].subject
    }
    if (!quizzes) {
      return res.status(404).send("Error! Nothing found.")
    }
    res.render('quizzes', templateVars)
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
