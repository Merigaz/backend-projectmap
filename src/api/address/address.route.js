const express = require('express')
const { submitForm, listForms, listNeighborhoods, listDates, listAddressNeigborhoods, listMarkersByNeighborhoods, listLatLng } = require('./address.controller')

const router = express.Router()

router.post('/submitform', submitForm)
router.get('/submitform', listForms)
router.get('/neighborhoods', listNeighborhoods)
router.get('/dates', listDates)
router.get('/addresses', listAddressNeigborhoods)
router.post('/markersByNeighborhoods', listMarkersByNeighborhoods)
router.get('/latlng', listLatLng)

module.exports = router