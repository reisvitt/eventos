const EventSchema = require("../models/Event");
const util = require("../utils/getUserByToken");
const permission = require("../utils/permission");
const mongooseError = require("../error/mongoose")

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
    return res.status(400).json({
      error: "Dados inválidos!"
    });
  }

  if (!user) {
    return res.status(401).json({
      error: "Você não tem autorização para criar uma evento!"
    });
  }

  try {
    const event = await EventSchema.create({ coordinator: user._id, ...body });

    return res.status(201).json(event);
  } catch (error) {
    return res.status(409).json({ error });
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
        ...body,
        updated_at: new Date()
      },
      (error, raw) => {
        if (error){
          return res.status(400).json({
            error: mongooseError.error(error)
          });
        }
        
        if(raw){
          if(raw.n !== 0){
            return res.status(200).json({
              message: "Atualizado com sucesso!"
            });
          }
        }

        return res.status(404).json({
          error: "Usuário não encontrado!"
        })
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
    return res.status(400).json({
      error: "Token expirado. Usuário não encontrado!"
    });
  }

  // busca o evento
  const event = await EventSchema.findById(eventID);

  // verifica se o usuario eh o coordenador
  if (user._id != event.coordinator) {
    // so o coordenador pode apagar o evento
    return res.status(401).json({
      error: "Você não tem autorização para deletar este evento!"
    });
  }

  // verificaçoes concluidas, pode deletar

  await EventSchema.deleteOne({ _id: eventID }, (error, raw) => {
    if (error) {
      return res.status(400).json({
        error: mongooseError.error(error) 
      });
    }

    if(raw){
      if(raw.n !== 0){
        return res.status(200).json({
          message: "Evento deletado com sucesso!"
        });
      }
    }

    return res.status(404).json({
      error: "Evento não encontrado!"
    });

  });
};

const get = async (req, res) => {
  const { id: eventID } = req.params;
  // verificar quem eh que esta logado. Se tem permissao ou nao

  try {
    const event = await EventSchema.findById(eventID);

    if (!event) {
      return res.status(404).json({
        error: "Evento não encontrado!"
      });
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
    return res.status(404).json({ 
      error: mongooseError.error(error) 
    });
  }
};

const deleteEvents = async (req, res) => {
  // verificar quem eh que esta logado. Se tem permissao ou nao
  try {
    await EventSchema.deleteMany();
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ error: mongooseError.error(error) });
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
