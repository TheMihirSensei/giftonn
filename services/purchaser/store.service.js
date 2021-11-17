
// this includes store and product related
class Store {



	addStore = () => {
		return new Promise(async (res, rej) => {
			try {

			} catch (err) {
				rej({ status: 500, message: "Internal Server Error", error: err })
			}
		})
	}

	deleteStore = () => {
		return new Promise(async (req, res) => {
			try {

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