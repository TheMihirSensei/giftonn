const purchaserModel = require("../../model/purchaser")

class Profile {
	getProfileData = (purchaserId) => {
		return new Promise(async (res, rej) => {
			try {
				let profileData = await purchaserModel.findById(purchaserId)
				if (purchaserData) {
					res(profileData)
				} else {
					rej({ status: 404, message: "No profie data found" })
				}
			} catch (err) {
				rej({ error: err, status: 500, message: "Internal Server Error" })
			}
		})
	}

	editProfileData = (purchaserId, purchaserData) => {
		return new Promise(async (res, rej) => {
			try {
				let updated = await purchaserModel.updateOne({ _id: purchaserId }, { $set: purchaserData })
				if (updated.matchedCount > 0 && updated.modifiedCount > 0) {
					res({})
				} else if (updated.matchedCount === 0) {
					rej({ status: 404, message: "No purchaser found" })
				} else if (updated.modifiedCount === 0) {
					rej({ status: 400, message: "didn't updated" })
				}
			} catch (err) {
				rej({ error: err, status: 500, message: "Internal Server Error" })
			}
		})
	}

	passwordChange = (purchaserId, newPassword) => {
		return new Promise(async (res, rej) => {
			try {
				let updated = await purchaserModel.updateOne({ _id: purchaserId }, { $set: { password: newPassword } })
				if (updated.matchedCount > 0 && updated.modifiedCount > 0) {
					res({})
				} else if (updated.matchedCount === 0) {
					rej({ status: 404, message: "No purchaser found" })
				} else if (updated.modifiedCount === 0) {
					rej({ status: 400, message: "didn't updated" })
				}
			} catch (err) {
				rej({ error: err, status: 500, message: "Internal Server Error" })
			}
		})
	}

	// will implement when get server
	profileImageChange = (purchaserId, image) => {
		return new Promise(async (res, rej) => {
			try {

			} catch (err) {
				rej({ status: 500, message: "Internal Server Error", error: err })
			}
		})
	}





}


module.exports = Profile