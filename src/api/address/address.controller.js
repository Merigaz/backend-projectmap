const Address = require("./address.model");
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.API_KEY,
  // Otras opciones de configuración aquí, si es necesario
})


const submitForm = async (req, res) => {
  try {
    const { name, id, address, markerAddress, neighborhood, date} = req.body;
    const idExistente = await Address.findOne({ id });
    if (idExistente) {
      return res.status(400).json({ mensaje: 'El id ya está registrado' });
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

    const marker = await Address.create({ name, id, address, markerAddress, neighborhood, date, locality, country, lat, lng });
    res.status(201).json({ message: 'Id registrado', data: marker });
  } catch (error) {
    res.status(400).json({ message: 'Id no pudo ser registrado', data: error.message });
  }
};

const listForms = async (req, res) => {
  try {
    const markers = await Address.find()
    res.status(200).json({message: 'Marcadores encontrados', data: markers})
  } catch (error) {
    res.status(400).json({message: 'Marcadores no encontrados', data: error})
  }
}

module.exports = { submitForm, listForms }
