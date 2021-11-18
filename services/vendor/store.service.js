const storeModel = require("../../model/store")

// this includes store and product related
class Store {
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

	getStore = (storeId) => {
		return new Promise(async (req, res) => {
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
		return new Promise(async (req, res) => {
			try {
				await this.getStore(stroId)
				await storeModel.deleteOne({ _id: storeId })


			} catch (err) {

			}
		})
	}

	editStore = () => {
		return new Promise(async (req, res) => {
			try {

			} catch (err) {

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