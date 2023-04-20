const express = require('express')
const {login, listUsers, signup } = require('./user.controller')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/users', listUsers)


module.exports = router