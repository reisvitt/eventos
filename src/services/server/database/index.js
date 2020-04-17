const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE, {
  useNewUrlParser:  true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  family: 4
}).then(() => {
  console.log("Connection with database - OK")
})
  .catch(err =>{
    console.error("Connection error", err)
  })

const db = mongoose.connection

module.exports = db