const homeRoute = require("express").Router()


//  Importing the auth controller
const homeController = require("../../../controller/purchaser/home.controller")
const { verifyPurchaserToken } = require("../../../middleware/tokenVerify")



homeRoute.get('/test', verifyPurchaserToken, homeController.test)


module.exports = homeRoute