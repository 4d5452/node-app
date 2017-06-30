const jwt = require('./token.js');

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
    return token;
  }).then((token) => {
    return jwt.verify(token);
  }).then((out) => {
    console.log("Printing verify return:");
    console.log(out);
    console.log("");
    return jwt.decode(out);
  }).then((decoded) => {
    console.log("Printing decoded message");
    console.log("HEADER:");
    console.log(decoded.header);
    console.log("");
    console.log("PAYLOAD");
    console.log(decoded.payload);
  }).catch((err) => {
    console.log("Error has occurred:");
    console.log(err);
  }); // end



