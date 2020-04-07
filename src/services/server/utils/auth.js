const jwt = require("./jwt");

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const user = jwt.verify(token);

    if (!user) {
      return res.sendStatus(401);
    }

    next();
  } catch (error) {
    return res.status(401).json(error);
  }
};

module.exports = { authMiddleware };
