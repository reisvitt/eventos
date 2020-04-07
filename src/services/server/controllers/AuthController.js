const User = require("../models/User");
const jwt = require("../utils/jwt");

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

      const token = await jwt.sign(user._id);
      return res.json({ token });
    });
  } catch (error) {
    return res.sendStatus(404);
  }
};

module.exports = {
  login,
};
