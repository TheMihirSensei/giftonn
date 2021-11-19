const categoryRoute = require("express").Router()

//  Importing the auth controller
const category = require("../../../controller/admin/category.controller")
const { AddCategory, AddSubCategory, validate, editCategory } = require("../../../middleware/validation")


categoryRoute.get('/', category.getAllCategory)
categoryRoute.post('/', AddCategory, validate, category.addCategory)


//subcategory 
categoryRoute.get('/:categoryId/subCategory/', category.getAllSubCategory)
categoryRoute.post('/:categoryId/subCategory', category.addSubCategory)
categoryRoute.delete('/:categoryId/subCategory/:subCategoryId', category.deleteSubCategory)
categoryRoute.put('/:categoryId/subCategory/:subCategoryId', category.editSubCategory)


// input field to specific subcategory
categoryRoute.post('/:categoryId/subCategory/:subCategoryId/inputField', category.addInputField)
categoryRoute.delete('/:categoryId/subCategory/:subCategoryId/inputField/:inputFieldId', category.deleteInputField)
categoryRoute.put('/:categoryId/subCategory/:subCategoryId/inputField/:inputFieldId', category.editInputField)

// category  
categoryRoute.get('/:categoryId', category.getCategoryById)
categoryRoute.put('/:categoryId', editCategory, validate, category.editCategory)
categoryRoute.delete('/:categoryId', category.deleteCategory)

// categoryRoute.get('/:categoryId/subCategory')


module.exports = categoryRoute