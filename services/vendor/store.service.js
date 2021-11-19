const storeModel = require("../../model/store")

// this includes store and product related
class Store {

	getAllStores = (vendorId) => {
		return new Promise(async (res, rej) => {
			try {
				let data = await storeModel.find({ vendorId })
				if (data && data.length > 0) {
					res(data)
				} else {
					rej({ status: 404, message: "No store data found" })
				}
			} catch (err) {
				rej({ status: 500, error: err, message: "Internal server Error" })
			}
		})
	}

	addStore = (storeData) => {
		return new Promise(async (res, rej) => {
			try {
				let newStore = new storeModel(storeData)
				await newStore.save()
				res({})

			} catch (err) {
				rej({ status: 500, message: "Internal Server Error", error: err })
			}
		})
	}

	getStoreById = (storeId) => {
		return new Promise(async (res, rej) => {
			try {
				let storeData = await storeModel.findById(storeId)
				if (storeData) {
					res(storeData)
				} else {
					rej({ status: 404, message: "no store data found" })
				}
			} catch (err) {
				rej({ status: 500, error: err, message: "Internal server Error" })
			}
		})
	}

	deleteStore = (storeId) => {
		return new Promise(async (res, rej) => {
			try {
				await this.getStoreById(storeId)
				let udpated = await storeModel.deleteOne({ _id: storeId })
				console.log("updated ssssss", udpated)
				if (udpated.deletedCount === 1) {
					res()
				} else {
					rej({ status: 400, message: "store didn't deleted" })
				}
			} catch (err) {
				if (err.status === 404) {

					return rej(err)
				} else {
					rej({ status: 500, error: err, message: "Internal server Error" })

				}
			}
		})
	}

	editStore = (storeId, storeData) => {
		return new Promise(async (req, res) => {
			try {
				let updated = await storeModel.updateOne({ _id: storeId }, storeData)
				if (updated.matchedCount > 0 && updated.modifiedCount > 0) {
					res({})
				} else if (updated.matchedCount === 0) {
					rej({ status: 404, message: "No store data found" })
				} else if (updated.modifiedCount === 0) {
					rej({ status: 400, message: "didn't updated" })
				}
			} catch (err) {
				rej({ status: 500, error: err, message: "Internal server Error" })
			}
		})
	}

	addProduct = () => {
		return new Promise(async (req, res) => {
			try {

			} catch (err) {

			}
		})
	}

	editProduct = () => {
		return new Promise(async (req, res) => {
			try {

			} catch (err) {

			}
		})
	}

	deleteProduct = () => {
		return new Promise(async (req, res) => {
			try {

			} catch (err) {

			}
		})
	}

}

module.exports = Store