const { Schema, model } = require("mongoose");

const placeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    markerAddress: {
      type: String,
      required: false
    },
    locality: {
      type: String,
      required: false,
    },
    country: {
      type: String,
      required: false,
    },
    lat: {
      type: Number,
      required: false
    },
    lng: {
      type: Number,
      required: false
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Place = model("place", placeSchema);

module.exports = Place;
