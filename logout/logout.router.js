const express = require('express');
const router = express.Router();

router.route('/')
  .post(function(req, res) {
    /* Have a logout post: */
    /* check headers for JWT */
    //req.headers
    res.send("Post to logout");
  });

module.exports = router;
