import CategoryModel from '../models/categoryModel.js'
import { StatusCodes, ReasonPhrases } from 'http-status-codes'

export async function returnHomeCategoryData(req, res) {
  try {
    const allCategoriesData = await CategoryModel.getAllCategories(
      req.DBconnection
    )
    res
      .status(StatusCodes.OK)
      .json({ messagecode: ReasonPhrases.OK, data: { allCategoriesData } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function returnSingleCategoryData(req, res) {
  try {
    const categoryData = await CategoryModel.getSingleCategory(
      req.DBconnection,
      req.params.id
    )
    res
      .status(StatusCodes.OK)
      .json({ messagecode: ReasonPhrases.OK, data: { categoryData } })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function addNewCategory(req, res, next) {
  try {
    const userId = req.payload.userId
    const { categoryTitle, categorySlug, categoryContent } = req.body
    const addedCategory = await CategoryModel.addNewCategory(
      req.DBconnection,
      userId,
      categoryTitle,
      categorySlug,
      categoryContent
    )
    res.status(StatusCodes.OK).json({ messagecode: ReasonPhrases.OK })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function editSingleCategoryData(req, res, next) {
  try {
    const { categoryTitle, categorySlug, categoryContent } = req.body
    const categoryId = req.params.id
    const results = await CategoryModel.editSingleCategory(
      req.DBconnection,
      categoryId,
      categoryTitle,
      categorySlug,
      categoryContent
    )
    res.status(StatusCodes.OK).json({ messagecode: ReasonPhrases.OK })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

export async function deleteSingleCategory(req, res, next) {
  try {
    const categoryId = req.params.id
    const results = await CategoryModel.deleteSingleCategory(
      req.DBconnection,
      categoryId
    )
    res.status(StatusCodes.OK).json({ messagecode: ReasonPhrases.OK })
  } catch (err) {
    console.log(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({ messagecode: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}
