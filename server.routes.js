const express = require('express');
const router = express.Router();

const login = require('./login/login.router.js');

router.get('/', function (req, res) {
  res.send('App Index');
});

router.use('/login', login);

module.exports = router;
