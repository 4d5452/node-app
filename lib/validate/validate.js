const username = /^[A-Za-z0-9]{3,16}$/;
const password = /^[A-Za-z0-9]{6,18}$/;

module.exports = () => {
  return {
    username: (uname) => test(username, uname),
    password: (psw) => test(password, psw)
  }
}

function test(reg, val) {
  return reg.test(val) ? val : null;
}
