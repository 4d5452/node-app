const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.route('/')
  .get(function(req, res) {
    /* request for reset password */
    res.sendFile(path.join(__dirname + '/reset.html'));
  }).post(jsonParser, function(req, res) {
    if(!req.body || !req.body.password) {
      return res.sendStatus(400);
    }
    /* Have a reset-password post: */
    res.send("POST reset-password");
  });

module.exports = router;
