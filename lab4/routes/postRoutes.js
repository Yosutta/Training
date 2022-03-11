const express = require('express')
const { route } = require('express/lib/application')
const {
  addNewPost,
  returnHomePostData,
  returnSinglePostData,
  editSinglePostData,
  deleteSinglePost,
} = require('../controllers/postController')
const CheckPermission = require('../middleware/checkPermisison')
const router = express.Router()

module.exports = function (DBconnection) {
  router.use((req, res, next) => {
    req.DBconnection = DBconnection
    next()
  })

  router.route('/').get(CheckPermission, returnHomePostData)
  router.route('/').post(CheckPermission, addNewPost)
  router.route('/:id').get(CheckPermission, returnSinglePostData)
  router.route('/:id').put(CheckPermission, editSinglePostData)
  router.route('/:id').delete(CheckPermission, deleteSinglePost)

  return router
}
