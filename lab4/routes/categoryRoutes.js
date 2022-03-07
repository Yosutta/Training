const express = require('express')
const { route } = require('express/lib/application')
const {
  addNewCategory,
  redirectHomeCategory,
  returnHomeCategoryData,
  returnSingleCategoryData,
  editSingleCategoryData,
  deleteSingleCategory,
} = require('../controllers/categoryController')
const router = express.Router()

module.exports = function (DBconnection) {
  router.use((req, res, next) => {
    req.DBconnection = DBconnection
    next()
  })

  router.route('/').get(returnHomeCategoryData).post(addNewCategory, redirectHomeCategory)

  router
    .route('/:id')
    .get(returnSingleCategoryData)
    .put(editSingleCategoryData, returnSingleCategoryData)
    .delete(deleteSingleCategory, returnHomeCategoryData)

  return router
}

// module.exports = router
