const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const validate = require(__base + '/lib/validate')();

/* Create log entry for all request to this route */
router.all('*', log);

router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/login.html'));
}); // end router.get

router.post('/', jsonParser,
  function(req, res) {
    if(!req.body || !req.body.username || !req.body.password) {
      /* A username and password must be passed in message body */
      req.log.warn("FAILED_LOGIN: malformed");
      return res.status(400)
        .send("Bad Request: Must provide username AND password");
    } // end if
    /* Validate and set the username and password */
    let uname = validate.username(req.body.username) ? req.body.username : null;
    let psw = validate.password(req.body.password) ? req.body.password : null;
    if(!uname || !psw) {
      /* username or password failed to validate */
      req.log.warn("FAILED_LOGIN: validation");
      return res.status(400)
        .send("Bad Request: Must provide valid username AND password");
    }
    /* Confirm user exist */
    
    /* Confirm user provided proper password */

    res.send(`Username: ${uname}, Password: ${psw}`);
  }, 
  function(err, req, res, next) { // handle errors
    /* In some cases this will be called (e.g. non-valid json) */
    let status = err.status ? err.status : 500;
    let message = err.message ? err.message : 'FAILED_LOGIN: unknown';
    req.log.error(message);
    res.status(status)
      .send("Bad Request: Please check your submission");
  }); // end router.post

module.exports = router;

/******************************FUNCTIONS*******************************/
/* Log login attempts */
function log(req, res, next) {
  req.log.info("LOGIN");
  next();
}
