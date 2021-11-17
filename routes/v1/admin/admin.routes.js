const { verifyAdminToken } = require("../../../middleware/tokenVerify")
const authRoute = require("./auth.routes")
const categoryRoute = require("./category.routes")


const adminRoute = require("express").Router()





adminRoute.get("/", (req, res) => { res.status(200).json({ message: "admin Initial Route" }) })
adminRoute.use("/auth", authRoute)
adminRoute.use("/category", verifyAdminToken, categoryRoute)



module.exports = adminRoute