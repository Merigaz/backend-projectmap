const { Schema, model } = require("mongoose")

const userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
}, {
  timestamps: true,
  versionKey: false
})

const User = model('user', userSchema)

module.exports = User