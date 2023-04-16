const mongoose = require('mongoose')

function connect () {
  
  const mongodbUri = process.env.MONGODB_URI

  mongoose.connect(mongodbUri)

  mongoose.connection.once("open", () => {
    console.log("Connection with mongoDB OK")
  })

  mongoose.connection.on("error", (error) => {
    console.log("Something went wrong!", error)
  })

  return mongoose.connection
}

module.exports = { connect }