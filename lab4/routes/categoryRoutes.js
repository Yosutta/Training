const express = require('express')
const { route } = require('express/lib/application')
const {
  addNewCategory,
  returnHomeCategoryData,
  returnSingleCategoryData,
  editSingleCategoryData,
  deleteSingleCategory,
} = require('../controllers/categoryController')
const CheckPermission = require('../middleware/checkPermisison')
const router = express.Router()

module.exports = function (DBconnection) {
  router.use((req, res, next) => {
    req.DBconnection = DBconnection
    next()
  })

  router.route('/').get(CheckPermission, returnHomeCategoryData)
  router.route('/').post(CheckPermission, addNewCategory)
  router.route('/:id').get(CheckPermission, returnSingleCategoryData)
  router.route('/:id').put(CheckPermission, editSingleCategoryData)
  router.route('/:id').delete(CheckPermission, deleteSingleCategory)

  return router
}

// module.exports = router
