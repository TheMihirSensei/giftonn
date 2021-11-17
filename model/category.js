const { Schema, model, } = require("mongoose")

const categorySchema = new Schema({
	categoryName: {
		type: String,
		trim: true,
		unique: true,
		required: true
	},
	subCategory: [{
		subCategoryName: {
			type: String,
			trim: true,
			unique: true
		},
		inputFields: [
			{
				inputName: {
					type: String,
				},
				inputType: {
					type: String
				}

			}
		]
	}]

}, { timestamps: true })





module.exports = model("category", categorySchema)