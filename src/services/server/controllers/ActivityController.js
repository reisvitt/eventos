const ActivitySchema = require("../models/Activity");
const EventSchema = require("../models/Event");
const permission = require("../utils/permission");
const mongooseError = require("../error/mongoose");

// Tipos de parâmetos:

// Query Params: req.query (filtrons, ordenação, paginação, ...)
// Route Params: request.params (Identificação de um recurso na auteração ou remoção)
// Body: request.body (Dados para criação ou auteração de um registro)

const create = async (req, res) => {
  const body = req.body;
  const token = req.headers.authorization;
  const { id: eventID } = req.params;
  // verificar quem eh que esta logado. Se tem permissao ou nao: status 403 caso nao seja

  // busca o usuario atraves do token

  const allow = await permission.allowedEvent(token, eventID);

  if (!allow) {
    return res.status(401).json({
      error: "Você não tem autorização para criar uma evento!",
    });
  }

  if (!body) {
    return res.status(400).json({
      error: "Dados inválidos!",
    });
  }

  try {
    const activity = await ActivitySchema.create({
      ...body,
      event_id: eventID,
    });

    await EventSchema.updateOne(
      { _id: eventID },
      {
        $push: { activities: activity._id },
      },
      (error, raw) => {
        if (error) {
          return res.status(400).json({
            error: mongooseError.error(error),
            // remover atividade do banco, pois deu um erro
          });
        }

        if (raw) {
          if (raw.n !== 0) {
            return res.status(201).json({
              message: "Atualizado com sucesso!",
              activity,
            });
          }
        }

        return res.status(404).json({
          error: "Usuário não encontrado!",
          // remover atividade do banco, pois deu um erro
        });
      }
    );
  } catch (error) {
    // console.log(error)
    return res.status(400).json({ error });
  }
};

const index = async (req, res) => {
  // listar todos os eventos OBS: nao precisa de autenticacao
  try {
    const activities = await ActivitySchema.find();

    return res.json(activities);
  } catch (error) {
    return res.status(404).json({
      error: mongooseError.error(error),
    });
  }
};

module.exports = {
  create,
  index,
};
