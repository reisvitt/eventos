const User = require ('../models/User')

const createUser = (req, res) => {
  const body = req.body

  if(!body){
    return res.status(400).json({
      success: false,
      error: 'Você precisa enviar um usuário'
    })
  }


  const user = new User({...body, created_at: new Date()})

  if(!user){
    return res.status(400).json({
      success: false,
      error: "Erro ao criar usuário - Dados incorretos"
    })
  }

  user.save()
    .then(() =>{
      return res.status(201).json({
        success: true,
        id: user._id,
        message: "User created"
      })
    })
    .catch(err => {
      return res.status(400).json({
        err,
        message: "User not created!"
      })
    })
}

const updateUser = (req, res) => {

  if(!req.body){
    return res.status(400).json({
      success: false,
      error: 'Você precisa enviar um usuário'
    })
  }

  User.findById(
    req.params.id,
    (user) => {

      if(user){
        user.set(req.body)
        user.update_at = new Date()

        user.save()
        .then(() => {
          return res.status(200).json({
            success: true,
            id: user._id,
            message: "User updated"
          })
        })
        .catch(err => {
          return res.status(404).json({
            error: err,
            message: "User not updated"
          })
        })
      }

      return res.status(400).json({
        message: "User not found"
      })

    }
  )

} 

const deleteUser = (req, res) => {
  const id = req.params.id

  User.findById(
    id,
    (user) => {
      if(user){
        user.remove()
          .then((newUser) => {
            return res.status(200).json({
              success: true,
              user: newUser,
              message: "User deleted"
            })
          })
          .catch(err => {
            return res.status(404).json({
              error: err,
              message: "User not deleted"
            })
          })
      }

      return res.status(400).json({
        message: "User not found"
      })
      
    }
  )
}


const getUser = (req, res) =>{
  const id = req.query.id

  User.findById(
    id,
    (err, user) => {
      if(user){

        return res.status(200).json({
          user
        })
      }

      return res.status(400).json({
        message: "User not found"
      })
    }
  )



}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser
}
