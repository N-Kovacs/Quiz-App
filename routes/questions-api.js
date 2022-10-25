const express = require('express');
const router  = express.Router();
const { getQuizQuestions } = require('../db/queries/questions');

router.get('/', (req, res) => {
  const id = req.session.quiz_id;
  getQuizQuestions(id)
    .then(questions => {
      res.json(questions); //return ARRAY here not obj
    })
    .catch(err => {
      console.log("INSIDE GET /questions-api", err.message)
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
