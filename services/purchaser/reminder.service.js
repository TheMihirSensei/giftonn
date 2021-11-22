const reminderModel = require("../../model/reminder")

class Reminder {
	getAllReminder = () => {
		return new Promise(async (res, rej) => {
			try {
				const data = await reminderModel.find({}).sort({ 'occasionDate': -1 })
				if (data && data.length > 0) {
					res(data)
				} else {
					rej({ status: 404, message: "no data found" })
				}

			} catch (err) {
				rej({ error: err, message: "Internal server error" })
			}
		})
	}
	addReminder = (reminderData) => {
		return new Promise(async (res, rej) => {
			try {
				let exist = await reminderModel.findOne(reminderData)
				if (exist) {
					rej({ status: 409, message: "this reminder is already exist" })
				} else {
					let newCategory = new reminderModel(category)
					await newCategory.save()
					res({ message: "added successfully" })
				}
			} catch (err) {
				rej({ error: err, status: 500, message: "Internal server error" })
			}
		})
	}

	getReminderById = (reminderId) => {
		return new Promise(async (res, rej) => {
			try {
				let data = await reminderModel.findById(reminderId)
				if (data) {
					res(data)
				} else {
					rej({ status: 404, message: "no data found" })
				}
			} catch (err) {
				rej({ error: err, status: 500, message: "Internal server error" })
			}
		})
	}

	delete = (reminderId) => {
		return new Promise(async (res, rej) => {
			try {

				let reminderData = await reminderModel.findByIdAndDelete(reminderId)
				if (reminderData) {
					res({ message: "deleted successfully" })
				} else {
					rej({ status: 404, message: "reminder is already deleted" })
				}
			} catch (err) {
				rej({ status: err?.status || 500, message: err?.message || "Internal server error" })
			}
		})
	}

	editReminder = (categoryId, categoryName) => {
		return new Promise(async (res, rej) => {
			try {
				const exist = await reminderModel.findOne({ categoryName })
				if (exist) {
					rej({ status: 409, message: "category is already exist" })
				}
				let updated = await reminderModel.updateOne({ _id: categoryId }, { $set: { categoryName } }, { new: true })
				if (updated.matchedCount > 0 && updated.modifiedCount > 0) {
					res({})
				} else if (updated.matchedCount === 0) {
					rej({ status: 404, message: "No category found" })
				} else if (updated.modifiedCount === 0) {
					rej({ status: 400, message: "didn't updated" })
				}
			} catch (err) {
				rej({ error: err, status: 500, message: "Internal server error" })
			}
		})
	}
}

module.exports = Reminder