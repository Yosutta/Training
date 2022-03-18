import * as express from 'express'
import {
  addNewCategory,
  returnHomeCategoryData,
  returnSingleCategoryData,
  editSingleCategoryData,
  deleteSingleCategory,
} from '../controllers/categoryController.js'
import CategoryValidate from '../middleware/validateinput/CategoryValidate.js'
import CheckPermission from '../middleware/checkPermisison.js'
const router = express.Router()

export default function (DBconnection) {
  router.use((req, res, next) => {
    req.DBconnection = DBconnection
    next()
  })

  router.route('/').get(CheckPermission, returnHomeCategoryData)
  router.route('/').post(CheckPermission, CategoryValidate, addNewCategory)
  router.route('/:id').get(CheckPermission, returnSingleCategoryData)
  router
    .route('/:id')
    .put(CheckPermission, CategoryValidate, editSingleCategoryData)
  router.route('/:id').delete(CheckPermission, deleteSingleCategory)

  return router
}
