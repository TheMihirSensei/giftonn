const jwt = require("jsonwebtoken")
require("dotenv").config()

exports.verifyPurchaserToken = async (req, res, next) => {
	try {
		const BearedToken = req.headers['authorization']
		if (!BearedToken) return res.status(403).json({ message: "Token is Missing" })
		const token = BearedToken.split(" ")[1]
		let payload = await jwt.verify(token, process.env.PURCHASER_SECRET_KEY)
		req.userId = payload.userId
		next()

	} catch (err) {
		if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
			return res.status(401).json({ message: err?.message })
		}

		res.status(500).json({ message: "Internal Server Error", error: err })
	}
}

exports.verifyVendorToken = async (req, res, next) => {
	try {
		const BearedToken = req.headers['authorization']
		if (!BearedToken) return res.status(403).json({ message: "Token is Missing" })
		const token = BearedToken.split(" ")[1]
		let payload = await jwt.verify(token, process.env.VENDOR_SECRET_KEY)
		req.userId = payload.userId
		next()

	} catch (err) {
		if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
			return res.status(401).json({ message: err?.message })
		}

		res.status(500).json({ message: "Internal Server Error", error: err })
	}
}

exports.verifyAdminToken = async (req, res, next) => {
	try {
		const BearedToken = req.headers['authorization']
		if (!BearedToken) return res.status(403).json({ message: "Token is Missing" })
		const token = BearedToken.split(" ")[1]
		let payload = await jwt.verify(token, process.env.ADMIN_SECRET_KEY)
		req.userId = payload.userId
		req.userRole = payload.role
		req.userRights = payload.rights
		next()

	} catch (err) {
		console.log("eror", err)
		if (err.name === "JsonWebTokenError" || err.name === "TokenExpiredError") {
			return res.status(401).json({ message: err?.message })
		}

		res.status(500).json({ message: "Internal Server Error", error: err })
	}
}

