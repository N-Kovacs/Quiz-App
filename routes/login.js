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
    .then(data => {

      const verifyPass =
      verifyPassword(req.body.password, data[0])

      if (!data[0]) {
        res.status(400).send("Sorry, couldn't that.");
      }
      if (!verifyPass) {
        res.status(401).send("Unauthorized!");
      }
      // res.json(data[0]); //return json obj?
      res.redirect(`/users/${data[0].id}`);
    })
    .catch(err => {
      res
        .status(500)
        .json({ error: err.message });
    });
});

module.exports = router;