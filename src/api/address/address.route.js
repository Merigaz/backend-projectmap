const express = require('express')
const { 
  submitForm, 
  listForms,
  listNeighborhoods,
  listDates,
  listAddressNeigborhoods,
  listMarkersByNeighborhoods,
  listLatLng,
  listPlaces,
  listAddressPlaces,
  listMarkersByPlaces,
  findAddressById,
  deleteAddressById
  } = require('./address.controller')

const router = express.Router()

router.post('/submitform', submitForm)
router.get('/submitform', listForms)
router.get('/neighborhoods', listNeighborhoods)
router.get('/dates', listDates)
router.get('/addresses', listAddressNeigborhoods)
router.post('/markersByNeighborhoods', listMarkersByNeighborhoods)
router.get('/latlng', listLatLng)
router.get('/listplaces', listPlaces)
router.post('/markersByPlaces', listMarkersByPlaces)
router.get('/places', listAddressPlaces)
router.post('/addressById', findAddressById)
router.post('/deleteAddress', deleteAddressById)

module.exports = router