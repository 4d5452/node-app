const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

router.all('*', log);

router.route('/')
  .get(function(req, res) {
    /* request for login POST page */
    res.sendFile(path.join(__dirname + '/login.html'));
  }).post(jsonParser, function(req, res) {
      if(!req.body || !req.body.username || !req.body.password) {
        req.log.warn({ body: req.body }, "INVALID POST"); // log and send
        return res.status(400)
          .send("Bad Request: Must provide username AND password");
      }
      /* Have a login post: */
      res.send(req.body.username);
    }, function(err, req, res, next) {
      let status = err.status ? err.status : 500;
      req.log.error({message: err.message, status: status });
      res.status(status)
        .send("Your request can not be completed");
    });

module.exports = router;

/* Log login attempts */
function log(req, res, next) {
  req.log.info("LOGIN");
  next();
}
