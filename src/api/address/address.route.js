const express = require('express')
const { submitForm, listForms } = require('./address.controller')

const router = express.Router()

router.post('/submitform', submitForm)
router.get('/submitform', listForms)

module.exports = router