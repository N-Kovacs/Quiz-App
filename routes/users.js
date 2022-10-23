/*
 * All routes for USERS are defined here
 * Since this file is loaded in server.js into /users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */
const express = require('express');
const router  = express.Router();
const userQueries = require('../db/queries/users');


router.get('/', (req, res) => {
  res.render('users');
});

router.get('/:id', (req, res) => {
  userQueries.getUserByID(req.params.id)
  .then(data => {
    const user_id = data[0].id;
    const templateVars = {
      user_id,
      name: data[0].name,
      email: data[0].email,
      rating: data[0].rating
    }
    if (!user_id) {
      return res.status(422).send("Invalid ID!")
    }
    res.render('user', templateVars);
  })
  .catch(err => {
    res
      .status(500)
      .json({ error: err.message });
  });
});

module.exports = router;
