const express = require('express')
const { submitFormPlace, listPlaces } = require('./place.controller')

const router = express.Router()

router.post('/submitplace', submitFormPlace)
router.get('/submitplace', listPlaces)

module.exports = router