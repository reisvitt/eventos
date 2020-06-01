const Event = require("../models/Event");
const User = require("../models/User");

const mongooseError = require("../error/mongoose");
const permission = require("../utils/permission");

const add = async (req, res) => {
  const { id: eventID } = req.params;
  const token = req.headers.authorization;
  const email = req.body.email;

  const allow = await permission.coordinator(token, eventID);

  if (!allow) {
    return res.status(401).json({
      error: "Você não tem autorização para adicionar um assistente",
    });
  }

  if (!email) {
    return res.status(400).json({
      error: "Dados inválidos",
    });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.sendStatus(404);
    }

    User.updateOne(
      { _id: user._id },
      {
        $addToSet: { events_assistant: eventID },
        update_at: new Date(),
      },
      () => {
        return res.status(200);
      }
    );

    Event.updateOne(
      { _id: eventID },
      {
        $addToSet: { assistants: user._id },
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
    );
  } catch (error) {
    return res.status(404).json({
      error: mongooseError.error(error),
    });
  }
};

const remove = async (req, res) => {
  const { eventId, userId } = req.params;
  const token = req.headers.authorization;

  const allow = await permission.coordinator(token, eventId);

  if (!allow) {
    return res.status(401).json({
      error: "Você não tem autorização remover um assistente!",
    });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.sendStatus(404);
    }

    User.updateOne(
      { _id: user._id },
      {
        $pull: { events_assistant: eventId },
        update_at: new Date(),
      },
      () => {
        return res.status(200);
      }
    );

    Event.updateOne(
      { _id: eventId },
      {
        $pull: { assistants: user._id },
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
    );
  } catch (error) {
    return res.status(404).json({
      error: mongooseError.error(error),
    });
  }
};

const list = async (req, res) => {
  const { id: eventID } = req.params;
  const token = req.headers.authorization;

  const allow = await permission.allowedEvent(token, eventID);

  if (!allow) {
    return res.status(401).json({
      error: "Você não tem autorização para lista os assistentes deste evento",
    });
  }

  try {
    const event = await Event.findById(eventID).populate("assistants").exec();
    if (!event) {
      return res.sendStatus(404);
    }

    const assistants = await event.assistants;

    return res.status(200).json(assistants);
  } catch (error) {
    res.sendStatus(404);
  }
};

const get = async (req, res) => {
  const { id: eventID } = req.params;
  const token = req.headers.authorization;
  const email = req.body.email;

  const allow = await permission.allowedEvent(token, eventID);

  if (!allow) {
    return res.status(401).json({
      error: "Você não tem autorização",
    });
  }

  try {
    const users = await User.find({ email });
    if (!users) {
      return res.sendStatus(404);
    }

    return res.status(200).json(users);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = { add, remove, list, get };
