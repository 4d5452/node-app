const username = /^[a-z0-9_-]{3,16}$/;
const password = /^[a-z0-9_-]{6,18}$/;

module.exports = () => {
  return {
    username: (uname) => username.test(uname.toLowerCase()),
    password: (psw) => password.test(psw.toLowerCase())
  }
}
