/* npm packages */
const bunyan = require('bunyan');
const express = require('express');
const helmet = require('helmet');
const path = require('path');

/* config files */
const server_config = require('./server.config.js')();
const bunyan_config = require('./bunyan.config.js')(server_config.name);

/* routes */
const server_routes = require('./server.router.js');

const app = express();
const log = bunyan.createLogger(bunyan_config);

app.use(helmet());
app.use('', server_routes);

/* 404 response handler */
app.use(function (req, res, next) {
  log.warn(
    {
      req: {
        ip: req.ip,
        method: req.method,
        url: req.originalUrl
      }
    }
  );
  res.status(404).sendFile(path.join(__dirname, '404.html'));
});

/* Error Handler */
app.use(function (err, req, res, next) {
  log.error({err: err});
});

/* Start the nodejs application */
app.listen(server_config.port, server_config.host, function() {
  log.info('Started');
});
