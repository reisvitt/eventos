const jwt = require("../utils/jwt");
const User = require("../models/User");

const createUser = async (req, res) => {
  const body = req.body;

  //verificar se usuario eh admin ou nao

  if (!body) {
    return res.sendStatus(400);
  }

  try {
    const result = await User.create({ ...body });
    const { password, ...user } = result.toObject();

    const token = await jwt.sign(user._id);

    return res.status(201).json({
      user: user,
      token,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};

const updateUser = (req, res) => {
  if (!req.body) {
    return res.status(400).json({
      success: false,
      message: "Você precisa enviar um usuário",
    });
  }

  User.findById(req.params.id, (user) => {
    if (user) {
      user.set(req.body);
      user.update_at = new Date();

      user
        .save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: user._id,
            message: "User updated",
          });
        })
        .catch((err) => {
          return res.status(404).json({
            error: err,
            message: "User not updated",
          });
        });
    }

    return res.status(400).json({
      message: "User not found",
    });
  });
};

const deleteUser = (req, res) => {
  const id = req.params.id;

  User.findById(id, (user) => {
    if (user) {
      user
        .remove()
        .then((newUser) => {
          return res.status(200).json({
            success: true,
            user: newUser,
            message: "User deleted",
          });
        })
        .catch((err) => {
          return res.status(404).json({
            error: err,
            message: "User not deleted",
          });
        });
    }

    return res.status(400).json({
      message: "User not found",
    });
  });
};

const getUser = (req, res) => {
  const id = req.query.id;

  User.findById(id, (err, user) => {
    if (user) {
      return res.status(200).json({
        user,
      });
    }

    return res.status(400).json({
      message: "User not found",
    });
  });
};

const deleteUsers = async (req, res) => {
  try {
    await User.deleteMany(); // no conditions = delete everyone

    return res.status(204).json();
  } catch (err) {
    return res.json({ err });
  }
};

const showUsers = async (req, res) => {
  try {
    const users = await User.find();

    return res.status(200).json(users);
  } catch (err) {
    return res.json({ err });
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
