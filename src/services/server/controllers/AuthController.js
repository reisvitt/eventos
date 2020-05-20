const User = require("../models/User");
const jwt = require("../utils/jwt");

let refreshTokens = []

const login = async (req, res) => {
  const [, hash] = req.headers.authorization.split(" ");
  const [email, password] = Buffer.from(hash, "base64").toString().split(":");

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.sendStatus(404);
    }


    user.comparePassword(password, async (error, isMatch) => {
      if (error) return res.sendStatus(401);

      const { password, ...result} = user.toObject();

      const token = await jwt.sign(user._id);
      const refreshToken = await jwt.signRefresh(user._id)
      refreshTokens.push(refreshToken)

      return res.status(200).json({ user: result, token, refreshToken });

    });
  } catch (error) {
    return res.sendStatus(404);
  }
};

const refreshLogin = async (req, res) => {
  // const user = await User.findOne({ email }).select("+password");

  const refreshToken = req.body.token
  if(refreshToken == null) return res.sendStatus(401)

  if(!refreshTokens.includes(refreshToken)) return res.sendStatus(403)

  jwt.verifyRefresh(refreshToken)

};

module.exports = {
  login,refreshLogin
};
