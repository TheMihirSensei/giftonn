const Category = require("../../services/admin/category.service")


const category = new Category()

exports.addCategory = async (req, res, next) => {
	try {
		await category.addCategory(req.body)
		res.status(200).json({ message: "success" })

	} catch (err) {
		console.log("category", err)
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.getCategoryById = async (req, res, next) => {
	try {
		let data = await category.getCategoryById(req.params.categoryId)
		res.status(200).json({ message: "success", data })

	} catch (err) {

		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.getAllCategory = async (req, res, next) => {
	try {
		console.log("calling right now")
		let data = await category.getAllCategory()
		res.status(200).json({ message: "success", data })
	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}


exports.editCategory = async (req, res, next) => {
	try {
		await category.editCategory(req.params.categoryId, req.body.categoryName)
		res.status(200).json({ message: "success" })

	} catch (err) {

		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.deleteCategory = async (req, res, next) => {
	try {
		await category.delete(req.params.categoryId)
		res.status(200).json({ message: "success" })

	} catch (err) {

		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.getAllSubCategory = async (req, res, next) => {
	try {
		let data = await category.getAllSubCategory(req.params.categoryId)
		res.status(200).json({ message: "success", data })
	} catch (err) {
		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.addSubCategory = async (req, res, next) => {
	try {
		await category.addSubCategory(req.params.categoryId, req.body.subCategoryName)
		res.status(200).json({ message: "success" })

	} catch (err) {

		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.editSubCategory = async (req, res, next) => {
	try {
		await category.editSubCategory(req.params.categoryId, req.params.subCategoryId, req.body.subCategoryName)
		res.status(200).json({ message: "success" })

	} catch (err) {

		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.deleteSubCategory = async (req, res, next) => {
	try {
		await category.deleteSubCategory(req.params.categoryId, req.params.subCategoryId)
		res.status(200).json({ message: "success" })

	} catch (err) {

		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

exports.addInputField = async (req, res, next) => {
	try {
		console.log("input field")
		await category.addInputFields(req.params.categoryId, req.params.subCategoryId, req.body)
		res.status(200).json({ message: "success" })

	} catch (err) {

		res.status(err?.status).json({ message: err?.message, error: err?.error })
	}
}

