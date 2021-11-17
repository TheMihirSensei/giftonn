const Auth = require("../../services/admin/auth.service")


const auth = new Auth()

exports.register = async (req, res, next) => {
	try {
		await auth.register(req.body)
		res.status(200).json({ message: "success" })

	} catch (err) {

		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.login = async (req, res, next) => {
	try {
		let token = await auth.login(req.body.email, req.body.password)
		res.status(200).json({ message: "success", token })

	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}