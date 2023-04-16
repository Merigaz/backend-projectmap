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
    location: {
      type: String,
      required: false,
    },
    formCount: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Address = model("address", addressSchema);

module.exports = Address;
