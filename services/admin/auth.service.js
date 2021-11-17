const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// model
const adminModel = require("../../model/admin")



class Auth {
	register = (adminData) => {
		return new Promise(async (res, rej) => {
			try {
				let newAdmin = adminModel(adminData)
				await newAdmin.save()
				res({ message: "register" })

			} catch (err) {
				console.log("eror", err)
				rej({ error: err, status: 500, message: "Internal server Error" })
			}
		})
	}

	login = (email, password) => {
		return new Promise(async (res, rej) => {
			try {
				const user = await adminModel.findOne({ email })
				if (user) {
					const pass = await bcrypt.compare(password, user.password)
					if (pass) {
						// generate JWT Token
						console.log("user id ", user._id, " pass", user.password, " role, ", user.adminRole, "rights : ", user.adminRights)
						let token = await jwt.sign({ userId: user._id, password: user.password, role: user.adminType, rights: user.adminRights }, process.env.ADMIN_SECRET_KEY, { expiresIn: process.env.ADMIN_EXPIRY_DATE })
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