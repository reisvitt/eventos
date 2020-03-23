const UserCtrl = require("../controllers/user-ctrl")
const express = require ("express")

const routes = express.Router()

routes.post('/user', UserCtrl.createUser)
routes.put('/user/:id', UserCtrl.updateUser)
routes.delete('/user/:id', UserCtrl.deleteUser)
routes.get('/user', UserCtrl.getUser)


module.exports = routes