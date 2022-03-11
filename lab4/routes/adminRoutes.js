const express = require('express')
const {
  updateAllUserPermission,
  updateSingleUserPermission,
  deleteAllUserPermission,
  deleteSingleUserPermission,
} = require('../controllers/adminController')
const router = express.Router()

module.exports = function (DBconnection) {
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
