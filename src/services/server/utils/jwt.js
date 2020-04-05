const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;

//expireIn: 50 => 50 segundos
// expireIn: '12h' => 12 horas

const sign = async (payload) =>
  await jwt.sign({ payload }, secret, { expiresIn: 50 });
const verify = (token) => jwt.verify(token, secret);
const decode = (token) => jwt.decode(token, secret);

module.exports = { sign, verify, decode };
