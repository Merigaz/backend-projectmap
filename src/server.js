require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { connect } = require('./db');
const userRoute = require('./api/user/user.route')
const addressRoute = require('./api/address/address.route')

const app = express()
const port = 8080
connect();

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.use(express.json())

app.use('/', userRoute)
app.use('/', addressRoute)

app.listen(port, () => {
  console.log(`Successfully running at port: ${port}`)
})