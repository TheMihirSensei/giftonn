const { verifyVendorToken, verifyAdminToken } = require("../../../middleware/tokenVerify")
const authRoute = require("./auth.routes")
const productRoute = require("./product.routes")
const storeRoute = require("./store.routes")
const vendorRoute = require("express").Router()


vendorRoute.get('/', (req, res) => { res.status(200).json({ message: "Vendor Initial Route" }) })
vendorRoute.use("/auth", authRoute)
vendorRoute.use("/store", verifyVendorToken, storeRoute)
vendorRoute.use("/product", verifyVendorToken, productRoute)



module.exports = vendorRoute