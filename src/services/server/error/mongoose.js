module.exports = {
  error(error){
    switch(error.code){
      case 11000:
        return "Já existe um usuário com estes dados!"
      default:
        return error
    }
  }
}