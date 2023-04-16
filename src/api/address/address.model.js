const { Schema, model } = require("mongoose");

const addressSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    id: {
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
    neighborhood: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
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

const Address = model("address", addressSchema);

module.exports = Address;
