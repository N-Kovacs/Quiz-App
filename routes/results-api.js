/*
 * All routes for User Data are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /api/users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */


const express = require('express');
const router = express.Router();
const resultsQueries = require('../db/queries/quiz_results');

router.get('/', (req, res) => {

  if (req.query.user) {
    console.log("yo");
    resultsQueries.getResultsByOwnerID(req.query.user)
      .then(results => res.json({ results }))
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  }
  /* THIS WAS COMMENTED OUT BELOW... INTENTIONALLY?? */
  else {
    quizQueries.getQuizzes()
    .then(quizzes => {
      res.json({ quizzes });
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
  }
  /* * * * * * * * * * * * * * * * * * * * * * * * * * */
});

module.exports = router;
