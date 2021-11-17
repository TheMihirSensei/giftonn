const authRoute = require("express").Router()

//  Importing the auth controller
const auth = require("../../../controller/purchaser/auth.controller")

// auth
authRoute.post('/register', auth.register)
authRoute.post('/login', auth.login)


module.exports = authRoute