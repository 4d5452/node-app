const express = require('express');
const router = express.Router();

const routes_dir = __dirname + '/routes';
const login = require(routes_dir + '/login/login.router.js');
const logout = require(routes_dir + '/logout/logout.router.js');
const reset_password = require(routes_dir + '/reset_password/reset.router.js');

router.get('/', function (req, res) {
  req.log.info("Server Ping");
  res.send(`Hello ${req.ip}`);
});

router.use('/login', login);
router.use('/logout', logout);
router.use('/reset/password', reset_password);

module.exports = router;
