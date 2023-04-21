require('dotenv').config()
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
    res.status(201).json(marker);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listForms = async (req, res) => {
  try {
    const markers = await Address.find()
    res.status(200).json(markers)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const listNeighborhoods = async (req, res) => {
  try {
    const markers = await Address.find()
    const neighborhoods = markers.map(marker => marker.neighborhood)
    const count = {}
    neighborhoods.forEach(str => {
      if (count[str]) {
        count[str]++
      } else {
        count[str] = 1
      }
    })

    const result = Object.keys(count).map(str => {
      return {
        name: str,
        count: count[str]
      }
    })

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message)
  }
}

const listDates = async (req, res) => {
  try {
    const markers = await Address.find()
    const dates = markers.map(marker => marker.date)
    const count = {}
    dates.forEach(date => {
      if (count[date]) {
        count[date]++
      } else {
        count[date] = 1
      }
    })

    const result = Object.keys(count).map(date => {
      return {
        name: date,
        count: count[date]
      }
    })
    for (let i = 0; i < result.length; i++) {
      const name = result[i].name;
      result[i].name = name.substring(4);
    }
    for (let i = 0; i < result.length; i++) {
      const name = result[i].name;
      result[i].name = name.substring(0, 2) + '-' + name.substring(2);
    }

    res.status(200).json(result)
  } catch (error) {
    res.status(400).json(error.message)
  }
}


module.exports = { submitForm, listForms, listNeighborhoods, listDates }
