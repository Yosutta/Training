const express = require('express')
const { route } = require('express/lib/application')
const {
  addNewPost,
  redirectHomePost,
  returnHomePostData,
  returnSinglePostData,
  editSinglePostData,
  deleteSinglePost,
} = require('../controllers/postController')
const router = express.Router()

module.exports = function (DBconnection) {
  router.use((req, res, next) => {
    req.DBconnection = DBconnection
    next()
  })

  router.route('/').get(returnHomePostData).post(addNewPost, redirectHomePost)

  router
    .route('/:id')
    .get(returnSinglePostData)
    .put(editSinglePostData, returnSinglePostData)
    .delete(deleteSinglePost, returnHomePostData)

  return router
}
