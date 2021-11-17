const purchaserRoute = require("express").Router()

const authRoute = require("./auth.routes")
const homeRoute = require("./home.routes")

//  Importing the auth controller


purchaserRoute.use('/auth', authRoute)
purchaserRoute.use('/home', homeRoute)

module.exports = purchaserRoute