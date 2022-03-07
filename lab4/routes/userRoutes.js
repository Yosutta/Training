const express = require('express')
const { route } = require('express/lib/application')
const {
  registerNewUser,
  returnAllUsersData,
  returnSingleUserData,
  deleteSingleUser,
  loginUser,
} = require('../controllers/userController')
const router = express.Router()

module.exports = function (DBconnection) {
  router.use((req, res, next) => {
    req.DBconnection = DBconnection
    next()
  })

  router.route('/').get(returnAllUsersData)

  router.route('/:id').get(returnSingleUserData).delete(deleteSingleUser)

  router.route('/register').get().post(registerNewUser)

  router.route('/login').get().post(loginUser)
  return router
}
