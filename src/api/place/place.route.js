const express = require('express')
const { submitFormPlace, listPlaces, placesByName, findPlaceByName, deletePlaceByName } = require('./place.controller')

const router = express.Router()

router.post('/submitplace', submitFormPlace)
router.get('/submitplace', listPlaces)
router.post('/placesByName', placesByName)
router.post('/placeByName', findPlaceByName)
router.post('/deletePlace', deletePlaceByName)

module.exports = router