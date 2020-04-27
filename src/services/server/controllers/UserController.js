const jwt = require("../utils/jwt");
const User = require("../models/User");
const mongooseError = require("../error/mongoose");

const createUser = async (req, res) => {
  const body = req.body;

  //verificar se usuario eh admin ou nao
  if (!body) {
    return res.status(400).json({
      error: "Requisição sem corpo",
    });
  }

  await User.create({ ...body }, async (error, result) => {
    if (error) {
      return res.status(400).json({
        error: mongooseError.error(error), // verifica o erro e retorna uma mensagem
      });
    } else {
      const { password, ...user } = result.toObject(); // remove a senha

      const token = await jwt.sign(user._id); // cria um token de acordo com o id do usuario recem criado

      return res.status(201).json({
        // retorna o usuario e o token
        user: user,
        token,
      });
    }
  });
};

const updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      error: "Você precisa enviar os dados!",
    });
  }

  User.updateOne(
    { _id: req.params.id },
    { ...req.body, update_at: new Date() },
    (err, raw) => {
      if (err) {
        return res.status(400).json({
          error: mongooseError.error(err),
        });
      }

      if (raw) {
        if (raw.n !== 0) {
          return res.status(200).json({
            message: "Usuário atualizado!",
          });
        }
      }

      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }
  );
};

const deleteUser = (req, res) => {
  User.deleteOne({ _id: req.params.id }, (err, raw) => {
    if (err) {
      return res.status(400).json({
        error: mongooseError.error(err),
      });
    }

    if (raw) {
      if (raw.n !== 0) {
        return res.status(200).json({
          message: "Usuário deletado!",
        });
      }
    }

    return res.status(404).json({
      error: "Usuário não encontrado",
    });
  });
};

const getUser = (req, res) => {
  const id = req.query.id;

  User.findById(id, (err, user) => {
    if (err) {
      return res.status(400).json({
        error: mongooseError.error(err),
      });
    }

    if (user) {
      return res.status(200).json({
        user,
      });
    }

    return res.status(404).json({
      error: "Usuário não encontrado!",
    });
  });
};

const deleteUsers = async (req, res) => {
  try {
    await User.deleteMany(); // no conditions = delete everyone

    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ error: mongooseError.error(error) });
  }
};

const showUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (err) {
    return res.json({ error: mongooseError.error(err) }); // verifica o erro e retorna uma mensagem });
  }
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  deleteUsers,
  showUsers,
};
