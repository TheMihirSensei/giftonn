const productModel = require("../../model/product")
class Product {
	addProduct = (productData) => {
		return new Promise(async (res, rej) => {
			try {
				let newProduct = await productModel(productData)
				await newProduct.save()
				res({})
			} catch (err) {
				rej({ status: 500, message: "Internal Server Error", error: err })
			}
		})
	}

	editProduct = (productId, productData) => {
		return new Promise(async (res, rej) => {
			try {
				let updated = await productModel.updateOne({ _id: productId }, { $set: productData })
				if (updated.matchedCount > 0 && updated.modifiedCount > 0) {
					res({})
				} else if (updated.matchedCount === 0) {
					rej({ status: 404, message: "No Product data found" })
				} else if (updated.modifiedCount === 0) {
					rej({ status: 400, message: "didn't updated" })
				}

			} catch (err) {
				console.log("erro sercice", err)
				rej({ status: 500, message: "Internal Server Error", error: err })
			}
		})
	}

	deleteProduct = (productId) => {
		return new Promise(async (res, rej) => {
			try {
				let deletedProduct = await productModel.findByIdAndDelete(productId)
				if (deletedProduct) {
					res()
				} else {
					rej({ status: 404, message: "product is already deleted" })
				}
			} catch (err) {
				rej({ status: 500, message: "Internal server Error", error: err })
			}
		})
	}

	getAllProducts = (vendorId) => {
		return new Promise(async (res, rej) => {
			try {
				let products = await productModel.find({ vendorId })
				if (products && products.length > 0) {
					res(products)
				} else {
					rej({ status: 404, message: "No products found" })
				}

			} catch (err) {
				rej({ status: 500, message: "Internal server Error", error: err })
			}
		})
	}

	getProductById = (productId) => {
		return new Promise(async (res, rej) => {
			try {
				let product = await productModel.findById(productId)
				if (product) {
					res(product)
				} else {
					rej({ message: "No product Found", status: 404 })
				}

			} catch (err) {
				rej({ status: 500, message: "Internal Server Error", error: err })
			}
		})
	}
}

module.exports = Product