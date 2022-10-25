/*
 * All routes for Quiz Data are defined here
 * Since this file is loaded in server.js into api/quizzes,
 *   these routes are mounted onto /api/quizzes
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

////    CURRENTLY UNUSED

const express = require('express');
const router  = express.Router();
const quizQueries = require('../db/queries/quizzes');

// router.get('/', (req, res) => {
//   quizQueries.getQuizzes()
//     .then(quizzes => {
//       res.json({ quizzes });
//     })
//     .catch(err => {
//       res
//         .status(500)
//         .json({ error: err.message });
//     });
// });

module.exports = router;
