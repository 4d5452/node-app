const express = require('express');
const router = express.Router();

const login = require(__base + '/routes/login');
const logout = require(__base + '/routes/logout');
const reset_password = require(__base + '/routes/reset_password');

router.get('/', function (req, res) {
  req.log.info("Server Ping");
  res.send(`Hello ${req.ip}`);
});

router.use('/login', login);
router.use('/logout', logout);
router.use('/reset/password', reset_password);

module.exports = router;
