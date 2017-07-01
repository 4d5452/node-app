const { exec } = require('child_process')
/* Create logger for the token module */
const bunyan = require('bunyan');
const bunyan_config = require('./logs.config.js')('jwt_logs');
const log = bunyan.createLogger(bunyan_config);

/* Make use of dependency injection and pass the log to the token module */
const jwt = require('./token.js')(log);

const data = {
  test: "data"
}

console.log("Testing the jwt module");
console.log("");

let token = jwt.sign(data);

token.then((token) => {
    console.log("Printing generated token:");
    console.log(token);
    console.log("");
    log.info("Token created");
    return jwt.verify(token);
  }).then((out) => {
    console.log("Printing verify return:");
    console.log(out);
    console.log("");
    log.info("Token verified");
    return jwt.decode(out);
  }).then((decoded) => {
    console.log("Printing decoded message");
    console.log("HEADER:");
    console.log(decoded.header);
    console.log("");
    console.log("PAYLOAD");
    console.log(decoded.payload);
    console.log("");
    log.info("Token decoded");
    return null;
  }).then(() => {
    console.log("Printing logs");
    exec( __dirname + '/print_logs.sh', function(err, stdout, stderr) {
      console.log(err, stdout, stderr);
    })
  }).catch((err) => {
    console.log("Error has occurred:");
    log.warn({ err: err });
  }); // end



