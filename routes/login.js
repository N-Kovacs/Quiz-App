// Routes for LOGIN

const express = require('express');
const router = express.Router();
const verifyPassword = require('../js/helpers');
const userQueries = require('../db/queries/users');

////      GET     ////

router.get('/', (req, res) => {
  res.render('login');
});

////      POST    ////

router.post('/', (req, res) => {

  userQueries.getUser(req.body.email)
    .then(user => {

      const verifyPass =
      verifyPassword(req.body.password, user[0])

      if (!user[0]) {
        res.status(400).send("Sorry, couldn't that.");
      }
      if (!verifyPass) {
        res.status(401).send("Unauthorized!");
      }
      // SET COOKIE req.session.user_id = user[0];
      // SET COOKIE req.session.user_name = 
      // res.redirect(`/users/${user[0].id}`);
      res.redirect('quizzes')
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;
