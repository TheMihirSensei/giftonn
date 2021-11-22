const profileRoute = require("express").Router()


//  Importing the auth controller
const profileController = require("../../../controller/purchaser/profile.controller")
const { verifyPurchaserToken } = require("../../../middleware/tokenVerify")



profileRoute.get('/', verifyPurchaserToken, profileController.getProfileData)
profileRoute.put('/', verifyPurchaserToken, profileController.editProfileData)
profileRoute.put('/password', verifyPurchaserToken, profileController.changePassword)
profileRoute.put('/image', verifyPurchaserToken, profileController.profileImageChange)

module.exports = profileRoute