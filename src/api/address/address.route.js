const express = require('express')
const { submitForm, listForms, listNeighborhoods, listDates } = require('./address.controller')

const router = express.Router()

router.post('/submitform', submitForm)
router.get('/submitform', listForms)
router.get('/neighborhoods', listNeighborhoods)
router.get('/dates', listDates)

module.exports = router