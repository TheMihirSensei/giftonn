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

exports.editPurchaserSchema = [
	check("email")
		.optional(true)
		.trim()
		.normalizeEmail()
		.isEmail()
		.withMessage("Invalid Email "),

	check("password")
		.trim()
		.notEmpty()
		.withMessage("password can't be empty")
		.isStrongPassword({ minUppercase: 1, minLowercase: 1, minLength: 6 })
		.withMessage("password is not strong enough protect your password by entering strong password"),

	check('fullName')
		.optional(true)
		.trim()
		.notEmpty()
		.withMessage("full name can't be empty")
		.isLength({ min: 5, max: 255 })
		.withMessage("fullName character must be between 5 to 255"),

	check("age")
		.optional(true)
		.isNumeric({ min: 5 })
		.withMessage("Age can't be string and age must be greater than 5"),

	check("city")
		.optional(true)
		.isString()
		.notEmpty()
		.withMessage("city can't be emtpy"),

	check('phone')
		.optional(true)
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
		.withMessage("storeName can't be empty")
		.optional(true),

	check('storeInfo')
		.optional(true)
		.isString()
		.withMessage("storeInfo must be string")
		.trim()
		.notEmpty()
		.withMessage("storeInfo can't be empty"),

	check('storeLogo')
		.optional(true)
		.isString()
		.withMessage("storeLogo must be string")
		.isURL()
		.withMessage("storeLogo must be image URL"),

	check("storeCertificate")
		.optional(true)
		.isString()
		.withMessage("storeCertificate must be string")
		.isURL()
		.withMessage("storeCertificate must be image URL"),

	check("storeImage")
		.optional(true)
		.isArray()
		.withMessage("storeImage must be array"),


	check("storeCategoryId")
		.optional(true)
		.isMongoId()
		.withMessage("storeCategoryId is not proper"),

	check("location.coordinates")
		.optional(true)
		.custom(arr => {
			if (arr instanceof Array && arr.length === 2) {
				return true
			} else {
				throw new Error("location coordinates must be array and length must be 2")
			}
		}),
	check("country")
		.optional(true)
		.trim()
		.notEmpty()
		.withMessage("country can't be empty"),

	check("city")
		.optional(true)
		.trim()
		.notEmpty()
		.withMessage("city can't be empty"),

	check("locality")
		.optional(true)
		.trim()
		.notEmpty()
		.withMessage("locality can't be empty"),

	check("address")
		.optional(true)
		.isLength({ min: 3 })
		.withMessage("at least 3 character required")

]





// --------------------------- Product ----------------------- //
exports.addProductSchema = [
	check('productTitle')
		.exists()
		.withMessage("productTitle Field is required")
		.trim()
		.notEmpty()
		.withMessage("storeName can't be empty"),

	check('productDescription')
		.trim()
		.notEmpty()
		.withMessage("productDescription can't be empty"),


	check('categoryId')
		.trim()
		.notEmpty()
		.withMessage("categoryId can't be empty")
		.isMongoId()
		.withMessage("please enter proper categoryId"),

	check('subCategoryId')
		.trim()
		.notEmpty()
		.withMessage("subCategoryId can't be empty")
		.isMongoId()
		.withMessage("please enter proper subCategoryId"),

	check('price')
		.exists()
		.withMessage("price is necessary")
		.isNumeric()
		.withMessage("price must be number"),

	check('qty')
		.exists()
		.withMessage("qty is necessary")
		.isInt()
		.withMessage("qty must be integer"),

	check('serviceCharge')
		.isNumeric({ min: 0, max: 100 })
		.withMessage("serviceCharge must be between 0 to 100"),

	check('isProductLaunched')
		.optional(true)
		.isBoolean()
		.withMessage("isProductLaunched must be boolean"),

	check("store.*")
		.isMongoId()
		.withMessage("please provide proper storeId in array"),


	check("tags.*")
		.optional(true)
		.isString()
		.withMessage("please provide tags in strings"),


	check("giftType")
		.optional(true)
		.trim()
		.notEmpty()
		.withMessage("giftType must be string")

]


exports.editProductSchema = [
	param('productId')
		.isMongoId()
		.withMessage("please provide proper productId in params"),

	check('productTitle')
		.trim()
		.notEmpty()
		.withMessage("storeName can't be empty")
		.optional(true),

	check('productDescription')
		.trim()
		.notEmpty()
		.withMessage("productDescription can't be empty")
		.optional(true),


	check('categoryId')
		.trim()
		.notEmpty()
		.withMessage("categoryId can't be empty")
		.isMongoId()
		.withMessage("please enter proper categoryId")
		.optional(true),

	check('subCategoryId')
		.trim()
		.notEmpty()
		.withMessage("subCategoryId can't be empty")
		.isMongoId()
		.withMessage("please enter proper subCategoryId")
		.optional(true),

	check('price')
		.isNumeric()
		.withMessage("price must be number")
		.optional(true),

	check('qty')
		.isInt()
		.withMessage("qty must be integer")
		.optional(true),

	check('serviceCharge')
		.isNumeric({ min: 0, max: 100 })
		.withMessage("serviceCharge must be between 0 to 100")
		.optional(true),

	check('isProductLaunched')
		.isBoolean()
		.withMessage("isProductLaunched must be boolean")
		.optional(true),

	check("store.*")
		.isMongoId()
		.withMessage("please provide proper storeId in array")
		.optional(true),


	check("tags.*")
		.isString()
		.withMessage("please provide tags in strings")
		.optional(true),


	check("giftType")
		.trim()
		.notEmpty()
		.withMessage("giftType must be string")
		.optional(true)
]








