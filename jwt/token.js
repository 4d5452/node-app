/* https://www.npmjs.com/package/jsonwebtoken 
 * NumericDate, see realated Token Expiration (exp claim)
 */
const fs = require('fs');
const jwt = require('jsonwebtoken');

const key_dir = __dirname + '/keys'
const cert_priv = fs.readFileSync(key_dir + '/rsa-key');
const cert_pub = fs.readFileSync(key_dir + '/rsa-key.pem.pub');
const algorithms = ["RS256"];
const expiresIn = "1h"; /* zeit/ms */
const audience = "";
const issuer = "";
const subject = "";

module.exports = {
  sign: (data) => sign(data),
  verify: (token) => verify(token),
  decode: (token) => decode(token)
};

function sign(data) {
  const promise = new Promise((resolve, reject) => {
    let payload = {
      data: data
    }
    let options = {
      algorithm: algorithms[0],
      expiresIn: expiresIn
    }
    /* sign and return the jwt, error otherwise */
    jwt.sign(payload, cert_priv, options, function(err, token) {
      if(err) {
        reject("Failure signing jwt");
      } else {
        resolve(token);
      }
    }); // end jwt.sign
  }); // end promise
  return promise;
} // end sign

function verify(token) {
  const promise = new Promise((resolve, reject) => {
    let options = {
      algorithms: algorithms
    }
    /* verify the jwt, error otherwise */
    jwt.verify(token, cert_pub, function(err, decoded) {
      if(err) { 
        reject("Token not valid");
      } else {
        resolve(token);
      }
    }); // end jwt.verify
  }); // end promise
  return promise;
} // end verify

function decode(token) {
  const promise = new Promise((resolve, reject) => {
    let decoded = jwt.decode(token, { complete: true });
    resolve(decoded);
  }); // end promise
  return promise;
} // end decode
