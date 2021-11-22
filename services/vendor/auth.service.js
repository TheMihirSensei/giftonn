const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// model
const vendorModel = require("../../model/vendor")

class Auth {
	register = (vendor) => {
		return new Promise(async (res, rej) => {
			try {
				let newVendor = vendorModel(vendor)
				await newVendor.save()
				res({ message: "register" })

			} catch (err) {
				rej({ error: err, status: 500, message: "Internal server Error" })
			}
		})
	}

	login = (email, password) => {
		return new Promise(async (res, rej) => {
			try {
				const user = await vendorModel.findOne({ email })
				if (user) {
					const pass = await bcrypt.compare(password, user.password)
					if (pass) {
						// generate JWT Token
						let token = await jwt.sign({ userId: user._id, password: user.password }, process.env.VENDOR_SECRET_KEY, { expiresIn: process.env.VENDOR_EXPIRY_DATE })
						res({ token })

					} else {
						rej({ status: 400, message: "password for this email is not right" })
					}
				} else {
					rej({ status: 404, message: "No User Found" })
				}

			} catch (err) {
				rej({ error: err, status: 500, message: "Internal server Error" })
			}
		})
	}

}

module.exports = Auth