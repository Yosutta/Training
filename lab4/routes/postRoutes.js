import * as express from 'express'
import {
  addNewPost,
  returnHomePostData,
  returnSinglePostData,
  editSinglePostData,
  deleteSinglePost,
} from '../controllers/postController.js'
import CheckPermission from '../middleware/checkPermisison.js'
const router = express.Router()

export default function (DBconnection) {
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
