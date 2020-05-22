const jwt = require("jsonwebtoken");
const secret = process.env.TOKEN_SECRET;
const secret_refresh = process.env.REFRESH_TOKEN

//expireIn: 50 => 50 segundos
// expireIn: '12h' => 12 horas

const sign = async (payload) => await jwt.sign({ payload }, secret);
const signRefresh = async (payload) => await jwt.sign({ payload }, secret_refresh);

const verify = (token) => jwt.verify(token, secret);
const verifyRefresh = (token) => jwt.verify(token,secret_refresh)


const decode = (token) => jwt.decode(token, secret);

module.exports = { sign, signRefresh, verify, verifyRefresh, decode };
