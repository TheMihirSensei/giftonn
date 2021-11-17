const authRoute = require("./auth.routes")

const vendorRoute = require("express").Router()


vendorRoute.get('/', (req, res) => { res.status(200).json({ message: "Vendor Initial Route" }) })
vendorRoute.use("/auth", authRoute)

module.exports = vendorRoute