const mongoose = require("mongoose")
require('dotenv/config')

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser:  true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log("Connection with database - OK")
})
  .catch(err =>{
    console.error("Connection error", err.message)
  })

const db = mongoose.connection

module.exports = db