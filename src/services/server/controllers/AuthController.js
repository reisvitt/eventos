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

      const { password, ...result } = user.toObject();

      const token = await jwt.sign(user._id);
      return res.status(200).json({ user: result, token });
    });
  } catch (error) {
    return res.sendStatus(404);
  }
};

const refreshToken = async (req, res) => {
  try {
    const token = req.headers.authorization;
    const data = await jwt.verify(token);

    const user = await User.findById(data._id);

    if (!user) {
      res.status(404).send({
        message: "Usuario não encontrado",
      });
      return;
    }

    const tokenData = await jwt.sign(user._id);

    res.status(201).json({ token });
  } catch (error) {
    res.status(500).send({
      message: "Falha ao processar sua requisição",
    });
  }
};

module.exports = {
  login,
  refreshToken,
};
