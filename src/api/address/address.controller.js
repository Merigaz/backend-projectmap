require("dotenv").config();
const Address = require("./address.model");
const googleMapsClient = require("@google/maps").createClient({
  key: process.env.API_KEY,
  // Otras opciones de configuración aquí, si es necesario
});
const axios = require('axios');
const submitForm = async (req, res) => {
  try {
    const { name, id, address, optional, markerAddress, neighborhood, date, pollingPlace } =
      req.body;
    const idExistente = await Address.findOne({ id });
    if (idExistente) {
      return res.status(400).json({ mensaje: "El id ya está registrado" });
    }
    const placesResponse = await axios.post(`${process.env.URI1}/placesByName`, {pollingPlace});
    const pollingAddress = placesResponse.data[0].address;
    const locality = "Barranquilla";
    const country = "Colombia";
    const composedAddress = `${markerAddress}, ${locality}, ${country}`;
    const geocodePromise = new Promise((resolve, reject) => {
      googleMapsClient.geocode(
        { address: composedAddress },
        function (err, response) {
          if (!err) {
            var lat = response.json.results[0].geometry.location.lat;
            var lng = response.json.results[0].geometry.location.lng;
            resolve({ lat, lng });
          } else {
            reject(err);
          }
        }
      );
    });

    const { lat, lng } = await geocodePromise;
    const formattedNeighborhood = neighborhood
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const formattedName = name
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
    const marker = await Address.create({
      name: formattedName,
      id,
      address,
      optional,
      markerAddress,
      neighborhood: formattedNeighborhood,
      date,
      locality,
      country,
      lat,
      lng,
      pollingPlace,
      pollingAddress
    });
    res.status(201).json(marker);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listForms = async (req, res) => {
  try {
    const markers = await Address.find();
    res.status(200).json(markers);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listMarkersByNeighborhoods = async (req, res) => {
  try {
    const neighborhoods = req.body.neighborhoods;
    const markers = await Address.find({
      neighborhood: { $in: neighborhoods },
    }).select("name id date address optional neighborhood pollingPlace pollingAddress");
    res.status(200).json(markers);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listNeighborhoods = async (req, res) => {
  try {
    const markers = await Address.find();
    const neighborhoods = markers.map((marker) => marker.neighborhood);
    const count = {};
    neighborhoods.forEach((str) => {
      if (count[str]) {
        count[str]++;
      } else {
        count[str] = 1;
      }
    });

    const result = Object.keys(count).map((str) => {
      return {
        name: str,
        count: count[str],
      };
    });

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listDates = async (req, res) => {
  try {
    const markers = await Address.find();
    const dates = markers.map((marker) => marker.date);
    const Ingresos = {};
    dates.forEach((date) => {
      if (Ingresos[date]) {
        Ingresos[date]++;
      } else {
        Ingresos[date] = 1;
      }
    });

    const result = Object.keys(Ingresos).map((date) => {
      return {
        name: date,
        Ingresos: Ingresos[date],
      };
    });
    for (let i = 0; i < result.length; i++) {
      const name = result[i].name;
      result[i].name = name.substring(4);
    }
    for (let i = 0; i < result.length; i++) {
      const name = result[i].name;
      result[i].name = name.substring(0, 2) + "-" + name.substring(2);
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listAddressNeigborhoods = async (req, res) => {
  try {
    const markers = await Address.find();
    const newData = markers.map((obj) => {
      return {
        name: obj.name,
        id: obj.id,
        address: obj.address,
        optional: obj.optional,
        neighborhood: obj.neighborhood,
        date: obj.date,
      };
    });
    const arrayNuevo = [];

    for (let i = 0; i < newData.length; i++) {
      const obj = newData[i];
      const neighborhoodIndex = arrayNuevo.findIndex(
        (elem) => elem.neighborhood === obj.neighborhood
      );

      if (neighborhoodIndex === -1) {
        const nuevoObj = {
          neighborhood: obj.neighborhood,
          datos: [
            {
              Nombre: obj.name,
              CC: obj.id,
              Dirección: obj.address,
              InfoAdicional: obj.optional,
              Fecha: obj.date,
            },
          ],
        };

        arrayNuevo.push(nuevoObj);
      } else {
        arrayNuevo[neighborhoodIndex].datos.push({
          Nombre: obj.name,
          CC: obj.id,
          Dirección: obj.address,
          InfoAdicional: obj.optional,
          Fecha: obj.date,
        });
      }
    }
    res.status(200).json(arrayNuevo);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const listLatLng = async (req, res) => {
  try {
    const markers = await Address.find({}, {lat: 1, lng: 1, address: 1, neighborhood: 1});
    const counts = markers.reduce((acc, { lat, lng, address, neighborhood }) => {
      const key = `${lat},${lng}`;
      if (!acc[key]) {
        acc[key] = {
          lat: Number(lat),
          lng: Number(lng),
          count: 0,
          address: address,
          neighborhood: neighborhood
        };
      }
      acc[key].count += 1;
      return acc;
    }, {});
    const groupedMarkers = Object.values(counts);
    res.status(200).json(groupedMarkers);
  } catch (error) {
    res.status(400).json(error.message);
  }

};

module.exports = {
  submitForm,
  listForms,
  listNeighborhoods,
  listDates,
  listAddressNeigborhoods,
  listMarkersByNeighborhoods,
  listLatLng,
};
