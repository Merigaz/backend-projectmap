const User = require('./user.model')
const bcrypt = require('bcrypt')

const signup = async (req, res) => {
  try {
    const { name,email, password } = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const user = await User.create({ name,email, password: passwordHash })
    
    res.status(201).json({message: 'Usuario creado', data: user.email})
  } catch (error) {
    res.status(400).json({message: 'Usuario no pudo ser creado', data: error})
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      throw new Error('Credenciales inválidas')
    }
    const validatePassword = await bcrypt.compare(password, user.password)
    if(!validatePassword) {
      throw new Error('Credenciales inválidas')
    }
  
   
    res.status(200).json({message:"good", name:user.name, isAdmin:user.isAdmin})
  } catch (error) {
    res.status(400).json({message: 'No se pudo iniciar sesión', data: error})
  }
}

const listUsers = async (req, res) => {
  try {
    const users = await User.find()
    res.status(200).json({message: 'Usuarios encontrados', data: users})
  } catch (error) {
    res.status(400).json({message: 'Usuarios no encontrados', data: error})
  }
}

module.exports = { signup, login, listUsers}