const CategoryModel = require('../models/categoryModel')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')

module.exports.returnHomeCategoryData = async (req, res) => {
  try {
    const all_categories_data = await CategoryModel.getAllCategories(req.DBconnection)
    res.status(StatusCodes.OK).json(all_categories_data)
  } catch {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
}

module.exports.returnSingleCategoryData = async (req, res) => {
  try {
    const category_data = await CategoryModel.getSingleCategory(req.DBconnection, req.params.id)
    res.status(StatusCodes.OK).json(category_data)
  } catch {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
}

module.exports.redirectHomeCategory = (req, res) => {
  res.redirect('/category')
}

module.exports.addNewCategory = async (req, res, next) => {
  const { category_title, category_slug, category_content } = req.body
  await CategoryModel.addNewCategory(req.DBconnection, category_title, category_slug, category_content)
  next()
}

module.exports.editSingleCategoryData = async (req, res, next) => {
  const { new_category_title, new_category_slug, new_category_content } = req.body
  const category_id = req.params.id

  try {
    await CategoryModel.editSingleCategory(
      req.DBconnection,
      category_id,
      new_category_title,
      new_category_slug,
      new_category_content
    )
  } catch {
    res.status(StatusCodes.BAD_REQUEST).send(ReasonPhrases.BAD_REQUEST)
  }
  next()
}

module.exports.deleteSingleCategory = async (req, res, next) => {
  const category_id = req.params.id
  try {
    await CategoryModel.deleteSingleCategory(req.DBconnection, category_id)
  } catch {
    res.status(StatusCodes.NOT_FOUND).send(ReasonPhrases.NOT_FOUND)
  }
  next()
}
