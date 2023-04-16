const express = require('express')
const {submitForm } = require('./address.controller')

const router = express.Router()

router.post('/submitform', submitForm)


module.exports = router