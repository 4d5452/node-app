const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.route('/')
  .get(function(req, res) {
    /* request for login POST page */
    res.sendFile(path.join(__dirname + '/login.html'));
  }).post(jsonParser, function(req, res) {
    if(!req.body) return res.sendStatus(400);
    /* Have a login post: */
    res.send(req.body.username);
  });

module.exports = router;
