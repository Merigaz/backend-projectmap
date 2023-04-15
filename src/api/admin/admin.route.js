const express = require('express')
const {login, listAdmins,signup } = require('./admin.controller')

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/admins', listAdmins)


module.exports = router