const CategoryModel = require('../models/categoryModel')
const { StatusCodes, ReasonPhrases } = require('http-status-codes')
const { json } = require('express/lib/response')

module.exports.returnHomeCategoryData = async (req, res) => {
  console.log('category')
  try {
    const all_categories_data = await CategoryModel.getAllCategories(
      req.DBconnection
    )
    res
      .status(StatusCodes.OK)
      .json({ messagecode: ReasonPhrases.OK, data: { all_categories_data } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

module.exports.returnSingleCategoryData = async (req, res) => {
  try {
    const category_data = await CategoryModel.getSingleCategory(
      req.DBconnection,
      req.params.id
    )
    res
      .status(StatusCodes.OK)
      .json({ messagecode: ReasonPhrases.OK, data: { category_data } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

module.exports.addNewCategory = async (req, res, next) => {
  try {
    const user_id = req.payload.user_id
    const { category_title, category_slug, category_content } = req.body
    const addedCategory = await CategoryModel.addNewCategory(
      req.DBconnection,
      user_id,
      category_title,
      category_slug,
      category_content
    )
    res.status(StatusCodes.OK).json({ messagecode: ReasonPhrases.OK })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

module.exports.editSingleCategoryData = async (req, res, next) => {
  try {
    const { new_category_title, new_category_slug, new_category_content } =
      req.body
    const category_id = req.params.id
    const results = await CategoryModel.editSingleCategory(
      req.DBconnection,
      category_id,
      new_category_title,
      new_category_slug,
      new_category_content
    )
    res.status(StatusCodes.OK).json({ messagecode: ReasonPhrases.OK })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

module.exports.deleteSingleCategory = async (req, res, next) => {
  try {
    const category_id = req.params.id
    const results = await CategoryModel.deleteSingleCategory(
      req.DBconnection,
      category_id
    )
    console.log(results)
    res.status(StatusCodes.OK).json({ messagecode: ReasonPhrases.OK })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}
