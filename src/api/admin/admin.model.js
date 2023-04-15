const { Schema, model } = require("mongoose")

const adminSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false
})

const Admin = model('admin', adminSchema)

module.exports = Admin