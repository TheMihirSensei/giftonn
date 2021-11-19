
const storeRoute = require("express").Router()
const store = require("../../../controller/vendor/store.controller")
const { addStore, validate, editInputField, editStore } = require("../../../middleware/validation")


storeRoute.get('/', store.getStores)
storeRoute.post("/", addStore, validate, store.addStore)
storeRoute.get("/:storeId", store.getStoreById)
storeRoute.put("/:storeId", editStore, store.editStore)
storeRoute.delete("/:storeId", store.deleteStore)







module.exports = storeRoute