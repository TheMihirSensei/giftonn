const Product = require("../../services/vendor/product.service")
const product = new Product()


exports.addProduct = async (req, res, next) => {
	try {
		req.body.vendorId = req.userId
		await product.addProduct(req.body)
		res.status(200).json({ message: "success" })
	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.editProduct = async (req, res, next) => {
	try {
		req.body.vendorId = req.userId
		await product.editProduct(req.params.productId, req.body)
		res.status(200).json({ message: "success" })
	} catch (err) {
		console.log("error", err)
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.deleteProduct = async (req, res, next) => {
	try {
		req.body.vendorId = req.userId
		await product.deleteProduct(req.params.productId)
		res.status(200).json({ message: "success" })
	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.getProducts = async (req, res, next) => {
	try {
		let data = await product.getAllProducts(req.userId)
		res.status(200).json({ message: "success", data })
	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.getProductById = async (req, res, next) => {
	try {
		let data = await product.getProductById(req.params.productId)
		res.status(200).json({ message: "success", data })
	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}