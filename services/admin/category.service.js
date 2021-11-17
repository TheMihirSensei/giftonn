const categoryModel = require("../../model/category")

class Category {
	getAllCategory = () => {
		return new Promise(async (res, rej) => {
			try {
				const data = await categoryModel.find({})
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
	addCategory = (category) => {
		return new Promise(async (res, rej) => {
			try {
				let exist = await categoryModel.findOne({ categoryName: category.categoryName })
				if (exist) {
					rej({ status: 409, message: "this category is already exist" })
				} else {
					let newCategory = new categoryModel(category)
					await newCategory.save()
					res({ message: "added successfully" })
				}

			} catch (err) {
				rej({ error: err, status: 500, message: "Internal server error" })
			}
		})
	}

	getCategoryById = (categoryId) => {
		return new Promise(async (res, rej) => {
			try {
				let data = await categoryModel.findById(categoryId)
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

	delete = (categoryId) => {
		return new Promise(async (res, rej) => {
			try {
				await this.getCategoryById(categoryId)
				await categoryModel.findByIdAndDelete(categoryId)
				res({ message: "deleted successfully" })
			} catch (err) {
				rej({ status: err?.status || 500, message: err?.message || "Internal server error" })
			}
		})
	}

	//for edit the category which scenario
	//edit category name
	//add subcategory to particular category  || remove subcategory from category
	//edit subcatory name
	getAllSubCategory = (categoryId) => {
		return new Promise(async (res, rej) => {
			try {
				let categoryData = await categoryModel.findById(categoryId);
				let data = categoryData?.subCategory
				console.log("data", data)
				if (data && data.length > 0) {
					res(data)
				} else {
					rej({ status: 404, message: "no data found" })
				}
			} catch (err) {
				rej({ status: 500, message: "Internal server Error", error: err })
			}
		})
	}

	editCategory = (categoryId, categoryName) => {
		return new Promise(async (res, rej) => {
			try {
				const exist = await categoryModel.findOne({ categoryName })
				if (exist) {
					rej({ status: 409, message: "category is already exist" })
				}
				let updated = await categoryModel.updateOne({ _id: categoryId }, { $set: { categoryName } }, { new: true })
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

	addSubCategory = (categoryId, subCategoryName) => {
		return new Promise(async (res, rej) => {
			try {
				//check if its' already exist or not 
				let exist = await categoryModel.findOne({ _id: categoryId, 'subCategory.subCategoryName': subCategoryName })
				if (exist) {
					rej({ message: "subCategory is already exist", status: 409 })
				} else {
					let addedSubcategory = await categoryModel.findByIdAndUpdate(categoryId, { $addToSet: { 'subCategory': { subCategoryName } } })
					res()
				}

			} catch (err) {
				rej({ error: err, status: 500, message: "Internal server Error" })
			}
		})
	}

	editSubCategory = (categoryId, subCategoryId, subCategoryName) => {
		return new Promise(async (res, rej) => {
			try {
				//check if its' already exist or not 
				let exist = await categoryModel.findOne({ _id: categoryId, 'subCategory.subCategoryName': subCategoryName })
				if (exist) {
					rej({ message: "subCategory is already exist in this category", status: 409 })

				} else {
					let updated = await categoryModel.updateOne(
						{ _id: categoryId, 'subCategory._id': subCategoryId },
						{ $set: { 'subCategory.$.subCategoryName': subCategoryName } },
						{ new: true }
					)


					if (updated.matchedCount > 0 && updated.modifiedCount > 0) {
						res({})
					} else if (updated.matchedCount === 0) {
						rej({ status: 404, message: "No subCategory found for updating" })
					} else if (updated.modifiedCount === 0) {
						rej({ status: 400, message: "didn't updated" })
					}

				}

			} catch (err) {
				rej({ error: err, status: 500, message: "Internal server Error" })
			}
		})
	}

	deleteSubCategory = (categoryId, subCategoryId) => {
		return new Promise(async (res, rej) => {
			try {
				//check if its' already exist or not 
				let exist = await categoryModel.findOne({ _id: categoryId, 'subCategory._id': subCategoryId })
				if (exist) {
					let udated = await categoryModel.updateOne({ _id: categoryId, 'subCategory._id': subCategoryId }, { $pull: { 'subCategory': { '_id': subCategoryId } } })
					console.log("iudat", udated)
					res()
				} else {
					rej({ message: "didn't found sub category", status: 404 })
				}
			} catch (err) {
				console.log("error", err)
				rej({ error: err, status: 500, message: "Internal server Error" })
			}
		})
	}

	addInputFields = (categoryId, subCategoryId, data) => {
		return new Promise(async (res, rej) => {
			try {
				console.log("input field", data)
				console.log("CATE: ", categoryId, "  ---sub ; ", subCategoryId)
				let updated = await categoryModel.updateOne(
					{ _id: categoryId, 'subCategory._id': subCategoryId },
					{ '$addToSet': { 'subCategory.$.inputFields': data } },
					{ new: true }
				)
				console.log("udpated at", updated)
				if (updated.matchedCount > 0 && updated.modifiedCount > 0) {
					res({})
				} else if (updated.matchedCount === 0) {
					rej({ status: 404, message: "No subCategory found for updating" })
				} else if (updated.modifiedCount === 0) {
					rej({ status: 400, message: "didn't updated" })
				}

			} catch (err) {
				rej({ status: 500, message: "Internal server Error", error: err })
			}
		})
	}

}

module.exports = Category