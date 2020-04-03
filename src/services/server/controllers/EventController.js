const EventSchema = require("../models/Event")


// Tipos de parâmetos:

// Query Params: req.query (filtrons, ordenação, paginação, ...)
// Route Params: request.params (Identificação de um recurso na auteração ou remoção)
//Body: request.body (Dados para criação ou auteração de um registro)


const createEvent = (req, res) => {
  const body = req.body

  // verificar quem eh que esta logado. Se tem permissao ou nao 


}

const updateEvent = (req, res) => {
  const body = req.body

  // verificar quem eh que esta logado. Se tem permissao ou nao 
}


const deleteEvent = (req, res) => {
  const body = req.params

  // verificar quem eh que esta logado. Se tem permissao ou nao 
}

const getEvent = (req, res) => {
  const body = req.query

  // verificar quem eh que esta logado. Se tem permissao ou nao 
}


module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEvent
}