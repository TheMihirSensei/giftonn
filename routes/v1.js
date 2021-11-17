const adminRoute = require("./v1/admin/admin.routes")
const purchaserRoute = require("./v1/purchaser/purchaser.routes")
const vendorRoute = require("./v1/vendor/vendor.routes")

const v1Route = require("express").Router()

v1Route.get('/', (req, res) => { res.status(200).json({ message: "v1 routes working" }) })


v1Route.use('/purchaser', purchaserRoute)
v1Route.use('/admin', adminRoute)
v1Route.use("/vendor", vendorRoute)


module.exports = v1Route