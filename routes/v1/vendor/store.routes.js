
const storeRoute = require("express").Router()
const store = require("../../../controller/vendor/store.controller")


storeRoute.get('/', (req, res) => { res.status(200).json({ message: "Vendor Initial Route" }) })
storeRoute.post("/", store.addStore)
storeRoute.get("/:storeId", store.getStore)


module.exports = storeRoute