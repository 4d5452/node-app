const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();

/* Create log entry for all request to this router */
router.all('*', log);

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/login.html'));
}); // end router.get

router.post('/', jsonParser, 
  function(req, res) {
    if(!req.body || !req.body.username || !req.body.password) {
      req.log.warn({ body: req.body }, "INVALID POST"); // log and send
      return res.status(400)
        .send("Bad Request: Must provide username AND password");
    } // end if
    /* Have a login post: */
    res.send(req.body.username);
  }, 
  function(err, req, res, next) { // handle errors
    let status = err.status ? err.status : 500;
    req.log.error({status: status }, err.message);
    res.status(status)
      .send("Bad Request");
  }); // end router.post

module.exports = router;

/******************************FUNCTIONS*******************************/
/* Log login attempts */
function log(req, res, next) {
  req.log.info("LOGIN");
  next();
}
