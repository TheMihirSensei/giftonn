const reminderRoute = require("express").Router()


//  Importing the auth controller
const profileController = require("../../../controller/purchaser/profile.controller")
const { verifyPurchaserToken } = require("../../../middleware/tokenVerify")



reminderRoute.get('/', verifyPurchaserToken, profileController.getProfileData)
reminderRoute.put('/', verifyPurchaserToken, profileController.editProfileData)
reminderRoute.put('/password', verifyPurchaserToken, profileController.changePassword)
reminderRoute.put('/image', verifyPurchaserToken, profileController.profileImageChange)

module.exports = reminderRoute