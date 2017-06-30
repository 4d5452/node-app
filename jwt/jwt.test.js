const jwt = require('./token.js');

const data = {
  test: "data"
}

console.log("Testing the jwt module");


let token = jwt.sign(data);

token.then((token) => {
  console.log(token);
  return token;
  jwt.verify(token);
  }).then((token) => {
    return jwt.verify(token);
  }).then((out) => {
    console.log(out);
  }).catch((err) => {
    console.log(err);
  }); // end



