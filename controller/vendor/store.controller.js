const Store = require("../../services/vendor/store.service")


const store = new Store()

exports.addStore = async (req, res, next) => {
	try {
		req.body.vendorId = req.userId
		console.log("req.userId", req.userId)
		await store.addStore(req.body)
		res.status(200).json({ message: "success" })

	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.getStores = async (req, res, next) => {
	try {

		let data = await store.getAllStores(req.userId)
		res.status(200).json({ message: "success", data })

	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.getStoreById = async (req, res, next) => {
	try {
		let data = await store.getStoreById(req.params.storeId)
		res.status(200).json({ message: "success", data })

	} catch (err) {
		console.log("error", err)
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.editStore = async (req, res, next) => {
	try {
		await store.editStore(req.params.storeId, req.body)
		res.status(200).json({ message: "store updated Successfully" })
	} catch (err) {
		res.status(500).json({ message: "Internal server Error" })
	}
}

exports.deleteStore = async (req, res, next) => {
	try {
		await store.deleteStore(req.params.storeId)
		res.status(200).json({ message: "store updated Successfully" })
	} catch (err) {
		res.status(err?.status).json({ message: err?.message })
	}
}
