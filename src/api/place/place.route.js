const express = require('express')
const { submitFormPlace, listPlaces, placesByName } = require('./place.controller')

const router = express.Router()

router.post('/submitplace', submitFormPlace)
router.get('/submitplace', listPlaces)
router.post('/placesByName', placesByName)

module.exports = router