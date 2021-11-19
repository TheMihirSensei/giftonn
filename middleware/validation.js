const { body, check, param, validationResult } = require("express-validator")

exports.validate = (req, res, next) => {
	console.log("coming there ")
	const result = validationResult(req).array()
	console.log("reuslt is : ", result)
	if (!result.length) return next()
	const errorMsg = result[0].msg
	res.status(422).json({ message: errorMsg })
}

exports.RegisterPurchaser = [
	check("email")
		.exists()
		.withMessage("email id required for registration")
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage("Invalid Email "),

	check("password")
		.exists()
		.withMessage("password field is requried")
		.trim()
		.notEmpty()
		.withMessage("password can't be empty")
		.isStrongPassword({ minUppercase: 1, minLowercase: 1, minLength: 6 })
		.withMessage("password is not strong enough protect your password by entering strong password"),

	check('fullName')
		.trim()
		.notEmpty()
		.withMessage("full name can't be empty")
		.isLength({ min: 5, max: 255 })
		.withMessage("fullName character must be between 5 to 255"),

	check("age")
		.isNumeric()
		.withMessage("Age can't be string"),

	check("city")
		.isString()
		.notEmpty()
		.withMessage("city can't be emtpy"),

	check('phone')
		.isNumeric()
		.withMessage("phone number must be Numberic"),



]





// category validation
exports.AddCategory = [
	check('categoryName')
		.exists()
		.withMessage("categoryName is required")
		.trim()
		.notEmpty()
		.withMessage("categoryName can't be emtpy")


]

exports.AddSubCategory = [
	param('categoryId')
		.exists()
		.withMessage("category Id not provided in params")
		.isMongoId()
		.withMessage("this is not proper category id please provide proper categoryId"),

	check("subCategoryName")
		.exists()
		.withMessage("subcategory Name is required")
		.trim()
		.notEmpty()
		.withMessage("subcategory name can't be empty")
]

exports.AddInputField = [
	param('categoryId')
		.exists()
		.withMessage("category Id not provided in params")
		.isMongoId()
		.withMessage("this is not proper category id please provide proper categoryId"),


	param('subCategoryId')
		.exists()
		.withMessage("subcategory Id not provided in params")
		.isMongoId()
		.withMessage("this is not proper sub category id please provide proper categoryId"),

	check("inputType")
		.trim()
		.exists()
		.withMessage("inputType  is required")
		.notEmpty()
		.withMessage("inputType  can't be empty"),

	check("inputName")
		.exists()
		.withMessage("inputName is required")
		.notEmpty()
		.withMessage("inputName can't be empty")
]

exports.editCategory = [
	param('categoryId')
		.exists()
		.withMessage("category Id not provided in params")
		.isMongoId()
		.withMessage("this is not proper category id please provide proper categoryId"),

	check('categoryName')
		.exists()
		.withMessage("categoryName is required")
		.trim()
		.notEmpty()
		.withMessage("categoryName can't be empty")
]


exports.editSubCategory = [
	param('categoryId')
		.exists()
		.withMessage("category Id not provided in params")
		.isMongoId()
		.withMessage("this is not proper category id please provide proper categoryId"),

	param('subCategoryId')
		.exists()
		.withMessage("subcategory Id not provided in params")
		.isMongoId()
		.withMessage("this is not proper sub category id please provide proper subCategoryId"),

	check('subCategoryName')
		.trim()
		.exists()
		.withMessage("subCategoryName is required")
		.notEmpty()
		.withMessage("subCategoryName can't be empty")


]


exports.editInputField = [
	param('categoryId')
		.exists()
		.withMessage("category Id not provided in params")
		.isMongoId()
		.withMessage("this is not proper category id please provide proper categoryId"),

	param('subCategoryId')
		.exists()
		.withMessage("subcategory Id not provided in params")
		.isMongoId()
		.withMessage("this is not proper sub category id please provide proper subCategoryId"),

	param('inputFieldId')
		.exists()
		.withMessage("inputFieldId not provided in params")
		.isMongoId()
		.withMessage("this is not proper inputFieldId please provide proper inputField"),

	check('inputType')
		.exists()
		.withMessage("subCategoryName is required")
		.notEmpty()
		.withMessage("subCategoryName can't be empty"),

	check('inputName')
		.trim()
		.exists()
		.withMessage("subCategoryName is required")
		.notEmpty()
		.withMessage("subCategoryName can't be empty")


]




// --------------------------- store ----------------------------- //

exports.addStore = [
	check('storeName')
		.exists()
		.withMessage("storeName is required")
		.trim()
		.notEmpty()
		.withMessage("storeName can't be empty"),

	check('storeInfo')
		.isString()
		.withMessage("storeInfo must be string")
		.trim()
		.notEmpty()
		.withMessage("storeInfo can't be empty"),

	check('storeLogo')
		.isString()
		.withMessage("storeLogo must be string")
		.isURL()
		.withMessage("storeLogo must be image URL"),

	check("storeCertificate")
		.isString()
		.withMessage("storeCertificate must be string")
		.isURL()
		.withMessage("storeCertificate must be image URL"),

	check("storeImage")
		.isArray()
		.withMessage("storeImage must be array"),


	check("storeCategoryId")
		.exists()
		.withMessage("storeCategoryId is required")
		.isMongoId()
		.withMessage("storeCategoryId is not proper"),

	check("location.coordinates")
		.exists()
		.withMessage("location's coordinates required")
		.custom(arr => {
			if (arr instanceof Array && arr.length === 2) {
				return true
			} else {
				throw new Error("location coordinates must be array and length must be 2")
			}
		}),
	check("country")
		.exists()
		.withMessage("country required")
		.trim()
		.notEmpty()
		.withMessage("country can't be empty"),



	check("city")
		.exists()
		.withMessage("city required")
		.trim()
		.notEmpty()
		.withMessage("city can't be empty"),

	check("locality")
		.exists()
		.withMessage("locality required")
		.trim()
		.notEmpty()
		.withMessage("locality can't be empty"),

	check("address")
		.isLength({ min: 3 })
		.withMessage("at least 3 character required")

]


exports.editStore = [
	check('storeName')
		.trim()
		.notEmpty()
		.withMessage("storeName can't be empty"),

	check('storeInfo')
		.isString()
		.withMessage("storeInfo must be string")
		.trim()
		.notEmpty()
		.withMessage("storeInfo can't be empty"),

	check('storeLogo')
		.isString()
		.withMessage("storeLogo must be string")
		.isURL()
		.withMessage("storeLogo must be image URL"),

	check("storeCertificate")
		.isString()
		.withMessage("storeCertificate must be string")
		.isURL()
		.withMessage("storeCertificate must be image URL"),

	check("storeImage")
		.isArray()
		.withMessage("storeImage must be array"),


	check("storeCategoryId")
		.isMongoId()
		.withMessage("storeCategoryId is not proper"),

	check("location.coordinates")
		.custom(arr => {
			if (arr instanceof Array && arr.length === 2) {
				return true
			} else {
				throw new Error("location coordinates must be array and length must be 2")
			}
		}),
	check("country")
		.trim()
		.notEmpty()
		.withMessage("country can't be empty"),

	check("city")
		.trim()
		.notEmpty()
		.withMessage("city can't be empty"),

	check("locality")
		.trim()
		.notEmpty()
		.withMessage("locality can't be empty"),

	check("address")
		.isLength({ min: 3 })
		.withMessage("at least 3 character required")

]