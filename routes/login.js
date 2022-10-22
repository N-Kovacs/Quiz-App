// Routes for LOGIN

const express = require('express');
const router = express.Router();
const verifyPassword = require('../js/helpers');
const userQueries = require('../db/queries/users');

////    GET

router.get('/', (req, res) => {
  res.render('login');
});

////    POST

router.post('/', (req, res) => {

  userQueries.getUser(req.body.email)
    .then(data => {

      const verifyPass =
      verifyPassword(req.body.password, data[0])

      if (!data[0]) {
        res.status(400).send("Sorry, couldn't find anything!");
      }
      if (!verifyPass) {
        res.status(401).send("Sorry, unauthorized!");
      }
      //if verifyPassword(...) true return the json obj
      // res.json(data[0]);
      res.redirect('/user/:id');
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

// create separate GET for user/:id

module.exports = router;
