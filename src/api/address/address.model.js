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
      required: true
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
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    lat: {
      type: Number,
      required: true
    },
    lng: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Address = model("address", addressSchema);

module.exports = Address;
