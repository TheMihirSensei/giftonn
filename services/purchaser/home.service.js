class Home {
	test = (userID) => {
		return new Promise(async (res, rej) => {
			try {
				res({ userID })

			} catch (err) {
				rej({ error: err, status: 500, message: "Internal server Error" })
			}
		})
	}

}

module.exports = Home