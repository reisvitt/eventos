const EventSchema = require("../models/Event");
const util = require("../utils/getUserByToken");
const permission = require("../utils/permission");

// Tipos de parâmetos:

// Query Params: req.query (filtrons, ordenação, paginação, ...)
// Route Params: request.params (Identificação de um recurso na auteração ou remoção)
//Body: request.body (Dados para criação ou auteração de um registro)

const create = async (req, res) => {
  const body = req.body;
  const token = await req.headers.authorization;

  // verificar quem eh que esta logado. Se tem permissao ou nao: status 403 caso nao seja

  // busca o usuario atraves do token
  const user = await util.getUser(token);

  if (!body) {
    return res.sendStatus(400);
  }

  if (!user) {
    return res.sendStatus(401);
  }

  try {
    const event = await EventSchema.create({ coordinator: user._id, ...body });

    return res.status(201).json(event);
  } catch (error) {
    return res.json({ error });
  }
};

const update = async (req, res) => {
  const body = req.body;

  // busca usario no bd atraves do token
  const token = req.headers.authorization;
  const { id: eventID } = req.params;

  const allow = await permission.allowedEvent(token, eventID);

  if (!allow) {
    return res.sendStatus(401);
  }

  // verificaçoes concluidas, pode fazer alteracao
  try {
    await EventSchema.updateOne(
      { _id: eventID },
      {
        updated_at: new Date(),
        ...body,
      },
      (error) => {
        if (error) return res.sendStatus(204);
        return res.sendStatus(204);
      }
    );
  } catch (error) {
    return res.sendStatus(400);
  }
};

const deleteEvent = async (req, res) => {
  const token = req.headers.authorization;
  const { id: eventID } = req.params;

  // busca usario no bd atraves do token
  const user = await util.getUser(token);

  // verifica se o usuario existe
  if (!user) {
    return res.sendStatus(400);
  }

  // busca o evento
  const event = await EventSchema.findById(eventID);

  // verifica se o usuario eh o coordenador
  if (user._id != event.coordinator) {
    // so o coordenador pode apagar o evento
    return res.sendStatus(401);
  }

  // verificaçoes concluidas, pode deletar
  try {
    await EventSchema.deleteOne({ _id: eventID }, (error) => {
      if (error) return res.json({ error });

      return res.sendStatus(204);
    });
  } catch (error) {
    return res.sendStatus(400);
  }
};

const get = async (req, res) => {
  const { id: eventID } = req.params;
  // verificar quem eh que esta logado. Se tem permissao ou nao

  try {
    const event = await EventSchema.findById(eventID);

    if (!event) {
      return res.sendStatus(404);
    }

    return res.json(event);
  } catch (error) {
    return res.sendStatus(400);
  }
};

const index = async (req, res) => {
  // listar todos os eventos OBS: nao precisa de autenticacao
  try {
    const events = await EventSchema.find();

    return res.json(events);
  } catch (error) {
    return res.json({ error });
  }
};

const deleteEvents = async (req, res) => {
  // verificar quem eh que esta logado. Se tem permissao ou nao
  try {
    await EventSchema.deleteMany();
    return res.sendStatus(204);
  } catch (error) {
    return res.json({ error });
  }
};

module.exports = {
  create,
  update,
  deleteEvent,
  get,
  index,
  deleteEvents,
};
