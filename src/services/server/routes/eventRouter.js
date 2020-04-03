const EventCtrl = require("../controllers/EventController")
const express = require("express")

const routes = express.Router()

// rotas devem estar autenticadas

routes.post('/event', EventCtrl.createEvent)
routes.put('/event/:id', EventCtrl.updateEvent)
routes.delete('/event/:id', EventCtrl.deleteEvent)
routes.get('/event', EventCtrl.getEvent)

module.exports = routes