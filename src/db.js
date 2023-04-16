require('dotenv').config()
const mongoose = require('mongoose')

function connect () {
  
  const mongodbUri = process.env.MONGODB_URI

  mongoose.connect(mongodbUri, {
    useNewUrlParser: true
  })

  mongoose.connection.once("open", () => {
    console.log("Connection with mongoDB OK")
  })

  mongoose.connection.on("error", (error) => {
    console.log("Something went wrong!", error)
  })

  return mongoose.connection
}

module.exports = { connect }