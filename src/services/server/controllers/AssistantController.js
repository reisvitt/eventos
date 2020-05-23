const Event = require("../models/Event");
const User = require("../models/User");

const mongooseError = require("../error/mongoose");
const permission = require("../utils/permission");

const add = async (req, res) => {
  const { id: eventID } = req.params;
  const token = req.headers.authorization;
  const email = req.body.email

  const allow = await permission.allowedEvent(token, eventID)

  if (!allow) {
    return res.status(401).json({
      error: "Você não tem autorização para criar uma evento!",
    });
  }

  if (!email) {
    return res.status(400).json({
      error: "Dados inválidos"
    })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.sendStatus(404);
    }

    Event.updateOne(
      { _id: eventID },
      {
        $push: { assistants: user._id },
        updated_at: new Date(),
      },
      (error, raw) => {
        if (error) {
          return res.status(400).json({
            error: mongooseError.error(error),
          });
        }

        if (raw) {
          if (raw.n !== 0) {
            return res.status(200).json({
              message: "Atualizado com sucesso!",
            });
          }
        }
        return res.status(404).json({
          error: "Não encontrado!",
        });
      }
    )
  } catch (error) {
    return res.status(404).json({
      error: mongooseError.error(error),
    });
  }
}

const remove = async (req, res) => {
  const { id: eventID } = req.params;
  const token = req.headers.authorization;
  const email = req.body.email

  const allow = await permission.allowedEvent(token, eventID)

  if (!allow) {
    return res.status(401).json({
      error: "Você não tem autorização para criar uma evento!",
    });
  }

  if (!email) {
    return res.status(400).json({
      error: "Dados inválidos"
    })
  }

  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.sendStatus(404);
    }

    Event.updateOne(
      { _id: eventID },
      {
        $pull:{ assistants: user._id },
        updated_at: new Date(),
      },
      (error, raw) => {
        if (error) {
          return res.status(400).json({
            error: mongooseError.error(error),
          });
        }

        if (raw) {
          if (raw.n !== 0) {
            return res.status(200).json({
              message: "Atualizado com sucesso!",
            });
          }
        }
        return res.status(404).json({
          error: "Não encontrado!",
        });
      }
    )
  } catch (error) {
    return res.status(404).json({
      error: mongooseError.error(error),
    });
  }
}

module.exports = { add, remove }