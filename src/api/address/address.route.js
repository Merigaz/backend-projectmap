const express = require('express')
const { submitForm, listForms, listNeighborhoods } = require('./address.controller')

const router = express.Router()

router.post('/submitform', submitForm)
router.get('/submitform', listForms)
router.get('/neighborhoods', listNeighborhoods)

module.exports = router