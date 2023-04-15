require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { connect } = require('./db');
const adminRoute = require('./api/admin/admin.route')

const app = express()
const port = process.env.PORT
connect();

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}))

app.use(express.json())

app.use('/', adminRoute)

app.listen(port, () => {
  console.log(`Successfully running at port: ${port}`)
})