const Place = require("./place.model");
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.API_KEY,
  // Otras opciones de configuración aquí, si es necesario
})

const submitFormPlace = async (req, res) => {
  try {
    const { name, address, markerAddress} = req.body;
    const addressExistente = await Place.findOne({ address });
    if (addressExistente) {
      return res.status(400).json({ mensaje: 'El lugar de votación ya está registrado' });
    }
    const nameExistente = await Place.findOne({ name });
    if (nameExistente) {
      return res.status(400).json({ mensaje: 'El lugar de votación ya está registrado' });
    }
    const locality = 'Barranquilla';
    const country = 'Colombia'
    const composedAddress = `${markerAddress}, ${locality}, ${country}`;
    const geocodePromise = new Promise((resolve, reject) => {
      googleMapsClient.geocode({ address: composedAddress }, function(err, response) {
        if (!err) {
          var lat = response.json.results[0].geometry.location.lat;
          var lng = response.json.results[0].geometry.location.lng;
          resolve({ lat, lng });
        } else {
          reject(err);
        }
      });
    });

    const { lat, lng } = await geocodePromise;
    const place = await Place.create({ name, address, markerAddress, locality, country, lat, lng });
    res.status(201).json(place);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listPlaces = async (req, res) => {
  try {
    const places = await Place.find()
    res.status(200).json(places)
  } catch (error) {
    res.status(400).json(error.message)
  }
}


const placesByName = async (req, res) => {
  try {
    const pollingPlace = req.body.pollingPlace;
    const place = await Place.find({
      name: { $in: pollingPlace },
    }).select("name address markerAddress locality country lat lng");
    res.status(200).json(place);
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const findPlaceByName = async (req, res) => {
  try {
    const { name } = req.body;
    const placeByName = await Place.findOne({ name });
    placeByName ?
    res.status(201).json({ message: "Datos encontrados", placeByName })
    :
    res.status(201).json({ message: "Datos no encontrados" })
  } catch (error) {
    res.status(400).json(error.message);
  }
};
const deletePlaceByName = async (req, res) => {
  try {
    const { name } = req.body;
    const placeDeleted = await Place.findOne({ name });
    const deleted = await Place.deleteOne({ name })

    res.status(201).json({message: "Lugar de votación eliminado", placeDeleted});
  } catch (error) {
    res.status(400).json(error.message);
  }
};

module.exports = { submitFormPlace, listPlaces, placesByName, findPlaceByName, deletePlaceByName }
