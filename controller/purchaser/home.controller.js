const Home = require("../../services/purchaser/home.service")

const home = new Home()

exports.test = async (req, res, next) => {
	try {
		console.log("req. uerid", req.userId)
		let userId = await home.test(req.userId)
		res.status(200).json({ message: "success", userId })

	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}