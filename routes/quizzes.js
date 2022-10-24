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

module.exports = router;
