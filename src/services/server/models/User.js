const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
  first_name: String,
  last_name: String,
  cpf: Number,
  email: String,
  avatar: String,
  created_at: Date,
  update_at: Date,
  events: [Object],
  admin: Boolean,
  events_admin: [Object]
})


module.exports = mongoose.model("User", UserSchema)