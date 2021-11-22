const purchaserRoute = require("express").Router()

const authRoute = require("./auth.routes")
const homeRoute = require("./home.routes")
const profileRoute = require("./profile.routes")

//  Importing the auth controller


purchaserRoute.use('/auth', authRoute)
purchaserRoute.use('/home', homeRoute)
purchaserRoute.use('/profile', profileRoute)


module.exports = purchaserRoute