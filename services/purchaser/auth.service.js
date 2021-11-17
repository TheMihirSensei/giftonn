const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()
// model
const purchaserModel = require("../../model/purchaser")

class Auth {
    register = (purchaseData) => {
        return new Promise(async (res, rej) => {
            try {
                let newPurchaser = purchaserModel(purchaseData)
                await newPurchaser.save()
                res({ message: "register" })

            } catch (err) {
                console.log("err", err.message)
                if (err.code === 11000) {
                    rej({ message: "Email is already exist please try again with another email id", status: 409 })
                }
                rej({ error: err, status: 500, message: "Internal server Error" })
            }
        })
    }

    login = (email, password) => {
        return new Promise(async (res, rej) => {
            try {
                const user = await purchaserModel.findOne({ email })
                if (user) {
                    const pass = await bcrypt.compare(password, user.password)
                    console.log("passoowrd", pass)
                    if (pass) {
                        // generate JWT Token
                        console.log("token expirty date", process.env.PURCHASER_EXPIRY_DATE)
                        let token = await jwt.sign({ userId: user._id, password: user.password }, process.env.PURCHASER_SECRET_KEY, { expiresIn: process.env.PURCHASER_EXPIRY_DATE || 10 })
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