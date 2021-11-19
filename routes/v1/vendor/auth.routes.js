const authRoute = require("express").Router()
const { check } = require("express-validator")
//  Importing the auth controller
const auth = require("../../../controller/vendor/auth.controller")

// auth
authRoute.post('/register', auth.register)
authRoute.post('/login', auth.login)


module.exports = authRoute