const Store = require("../../services/vendor/store.service")


const store = new Store()

exports.addStore = async (req, res, next) => {
	try {
		await store.addStore(req.body)
		res.status(200).json({ message: "success" })

	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.getStore = async (req, res, next) => {
	try {
		let data = await store.getStore(req.params.storeId)
		res.status(200).json({ message: "success", data })

	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

