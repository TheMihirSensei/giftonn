
const productRoute = require("express").Router()
const product = require("../../../controller/vendor/product.controller")
const { addProductSchema, validate, editProductSchema } = require("../../../middleware/validation")


productRoute.get('/', product.getProducts)
productRoute.post("/", addProductSchema, validate, product.addProduct)
productRoute.get("/:productId", product.getProductById)
productRoute.put("/:productId", editProductSchema, validate, product.editProduct)
productRoute.delete("/:productId", product.deleteProduct)

module.exports = productRoute