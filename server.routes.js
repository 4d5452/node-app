const express = require('express');
const router = express.Router();

const login = require('./login/login.router.js');
const logout = require('./logout/logout.router.js');
const reset_password = require('./reset_password/reset.router.js');

router.get('/', function (req, res) {
  res.send('App Index');
});

router.use('/login', login);
router.use('/logout', logout);
router.use('/reset/password', reset_password);

module.exports = router;
