const Profile = require("../../services/purchaser/profile.service")
const profile = new Profile()

exports.getProfileData = async (req, res, next) => {
	try {
		let data = await profile.getProfileData(req.userId)
		res(data)
	} catch (err) {
		res.status(err?.status || 500).json({ message: err?.messaage || "Internal Server Error", error: err?.error })
	}
}

exports.editProfileData = async (req, res, next) => {
	try {
		if (req.body.password) {
			return res.status(400).json({ message: "you can't change password" })
		}
		let data = await profile.editProfileData(req.userId, req.body)
		res(data)
	} catch (err) {
		res.status(err?.status || 500).json({ message: err?.messaage || "Internal Server Error", error: err?.error })
	}
}


exports.changePassword = async (req, res, next) => {
	try {
		let data = await profile.passwordChange(req.userId, req.body.newPassword)
		res(data)
	} catch (err) {
		res.status(err?.status || 500).json({ message: err?.messaage || "Internal Server Error", error: err?.error })
	}
}

exports.profileImageChange = async (req, res, next) => {
	try {
		// will implement when server is done
	} catch (err) {
		res.status(err?.status || 500).json({ error: err?.error, message: err?.message || "Internal Server Error" })
	}
}



