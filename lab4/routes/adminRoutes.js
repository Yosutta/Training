import * as express from 'express'
import {
  updateAllUserPermission,
  updateSingleUserPermission,
  deleteAllUserPermission,
  deleteSingleUserPermission,
} from '../controllers/adminController.js'
const router = express.Router()

export default function (DBconnection) {
  router.use((req, res, next) => {
    req.DBconnection = DBconnection
    next()
  })

  router.route('/users/permission').post(updateAllUserPermission)
  router.route('/users/permission').delete(deleteAllUserPermission)
  router.route('/user/permission').post(updateSingleUserPermission)
  router.route('/user/permission').delete(deleteSingleUserPermission)

  return router
}
